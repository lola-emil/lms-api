import type { Request, Response } from "express";
import { ZOOM_CLIENT_SECRET, ZOOM_CLIENT_ID, ZOOM_MEETING_SDK_KEY, ZOOM_MEETING_SDK_SECRET, PORT } from "../../config/constants";
import { ErrorResponse } from "../../utils/response";
import axios from "axios";

const callbackURI = `http://localhost:${PORT}/zoom/oauth/callback`;

export async function authorize(req: Request, res: Response) {
    // const { redirect_uri } = req.query;

    // if (!redirect_uri)
    //     throw new ErrorResponse(400, "", { message: "Invalid redirect URI" });

    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${callbackURI}`;

    return res.redirect(zoomAuthUrl);
}

export async function getOAuthToken(req: Request, res: Response) {
    const authCode = req.query.code;
    const tokenUrl = "https://zoom.us/oauth/token";

    const basicAuth = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

    try {
        const paramObj = {
            grant_type: "authorization_code",
            code: authCode,
            redirect_uri: callbackURI
        };

        const params = new URLSearchParams((<any>paramObj));

        const response = await axios.post(`${tokenUrl}?${params.toString()}`, {},
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

        console.log("Access Token:", response.data.access_token);
        res.send("Access Token received. Check console.");
    } catch (error: any) {
        console.error("Error getting token:", error.response?.data || error.message);
        res.status(500).send("Token exchange failed");
    }
}

export async function createMeeting(req: Request, res: Response) {

}

export async function joinMeeting(req: Request, res: Response) {

}