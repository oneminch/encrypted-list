"use strict";
const getData = require("./helpers/getData");
const formatReturn = require("./helpers/formatReturn");

exports.handler = async (event, callback) => {
	try {
		const altHost = `${process.env.ALT_BASE_URL}`;
		const mainHost = `${process.env.MAIN_BASE_URL}`;

		const altReferer = `https://${process.env.ALT_BASE_URL}/excluded`;
		const mainReferer = `https://${process.env.MAIN_BASE_URL}/excluded`;

		if (
			event.httpMethod === "GET" &&
			(event.headers.host === altHost ||
				event.headers.host === mainHost) &&
			(event.headers.referer.indexOf(altReferer) >= 0 ||
				event.headers.referer.indexOf(mainReferer) >= 0)
		) {
			if (Object.keys(event.queryStringParameters).length > 0) {
				const initialLimit = event.queryStringParameters.limit;
				return await getData("Excluded", initialLimit);
			} else {
				return await getData("Excluded");
			}
		} else {
			return formatReturn(404, {
				error: "Error Making Request (Unauthorized)",
			});
		}
	} catch (err) {
		console.error("Somethings gone wrong ", err);
		return callback(null, formatReturn(500, { error: err }));
	}
};
