const config = require("config");
const validUrl = require('valid-url');

const dbCon = require("../../_helpers/dbConnect");
const shortId = require("../../_helpers/makeShortId");
const ipAddress = require("../../_helpers/getIpAddress");

const baseUrl = config.get("baseURL");

/**
 * @function : (generateurl)
 * @description : POST API for creating short url from Original URL
 * @author : Vadivel Subramanian
 * @version : 1.1
 * @since : 07/09/2020
 * @method : POST
 */
exports.generateurl = async (req, res, next) => {
    const longUrl = req.body.originalUrl;

    const reqIp = ipAddress.getIpAddress();
    const getReqIp = reqIp["Wi-Fi"][0] != "" ? reqIp["Wi-Fi"][0] : reqIp["en0"][0];

    if (!validUrl.isUri(longUrl)) {
        return res.status(401).send({
            status: 'error',
            message: 'Missing URL. Please enter a valid url for shortening.'
        });
    }
    const urlCode = shortId.makeShortId(5);
    if (validUrl.isUri(longUrl)) {
        try {
            const selectQry = "SELECT * FROM `urls` WHERE `url` = '" + longUrl + "';";
            let url = await dbCon.executeQuery(selectQry);
            if (url.length > 0) {
                return res.status(200).send({
                    status: 'success',
                    originalUrl: url[0].url,
                    shortUrl: baseUrl + '/' + url[0].segment,
                    urlCode: url[0].segment
                });
            } else {
                const insertUrlsTable =
                    "INSERT INTO `urls` (`url`, `segment`, `ip`) VALUES ('" + longUrl + "','" + urlCode + "','" + getReqIp + "')";
                await dbCon.executeQuery(insertUrlsTable);
                return res.status(201).send({
                    status: 'success',
                    originalUrl: longUrl,
                    shortUrl: baseUrl + '/' + urlCode,
                    urlCode
                });
            }
        } catch (e) {
            return res.status(500).send({
                status: 'error',
                message: 'Internal Server Error'
            })
        }
    } else {
        res.status(400).send({
            status: 'error',
            message: 'Invalid URL. Please enter a valid url for shortening.'
        });
    }
}

/**
 * @function : (getShortenUrl)
 * @description : GET API for redirect to original url from click the short url.
 * @author : Vadivel Subramanian
 * @version : 1.1
 * @since : 07/09/2020
 * @method : GET
 */
exports.getShortenUrl = async (req, res, next) => {
    const reqIp = ipAddress.getIpAddress();
    const getReqIp = reqIp["Wi-Fi"][0] != "" ? reqIp["Wi-Fi"][0] : reqIp["en0"][0];

    const shortUrlCode = req.params.urlCode;
    try {
        const selectQry = "SELECT * FROM `urls` WHERE `segment` = '" + shortUrlCode + "';";
        let url = await dbCon.executeQuery(selectQry);
        if (url.length > 0) {
            let num_of_clicks = url[0].num_of_clicks;
            num_of_clicks++;

            const updateQry = "UPDATE `urls` SET `num_of_clicks`= ? WHERE `segment` = ?";
            await dbCon.executeParams(updateQry, [num_of_clicks, shortUrlCode]);

            const insertUrlsTable =
                "INSERT INTO `stats` (`url_id`, `ip`, `referer`) VALUES ('" + url[0].id + "','" + getReqIp + "','')";
            await dbCon.executeQuery(insertUrlsTable);

            // return res.redirect(url[0].url);
            return res.status(201).send({
                status: 'success',
                originalUrl: url[0].url
            });
        } else {
            return res.status(400).send({
                status: 'error',
                message: "The short url doesn't exists!."
            });
        }
    } catch (e) {
        return res.status(500).send({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

/**
 * @function : (getStats)
 * @description : GET API for statistics of the URLs.
 * @author : Vadivel Subramanian
 * @version : 1.1
 * @since : 07/09/2020
 * @method : GET
 */
exports.getStats = async (req, res, next) => {
    try {
        const selectQry = "SELECT * FROM `urls`;";
        let url = await dbCon.executeQuery(selectQry);
        if (url.length > 0) {
            const arrData = url.map(item => {
                return {
                    id: item.id,
                    originalUrl: item.url,
                    shortUrl: baseUrl + "/" + item.segment,
                    clickCount: item.num_of_clicks
                }
            })
            return res.status(200).send({
                status: 'success',
                data: arrData
            });
        } else {
            return res.status(400).send({
                status: 'error',
                message: "The short urls doesn't exists!!."
            });
        }
    } catch (e) {
        return res.status(500).send({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}