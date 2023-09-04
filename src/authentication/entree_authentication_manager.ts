import { Request } from "express";
import { BaseClient, Issuer } from "openid-client";

/**
 * This class is responsible for managing the authentication process with Entree.
 */
class EntreeAuthenticationManager {   
    /**
     * Initializes the client used to communicate with Entree.
     */
    public static async initializeClient(): Promise<BaseClient> {
        const KN_ISSUER_URL = process.env.KN_ISSUER_URL;
        const KN_CLIENT_ID = process.env.KN_CLIENT_ID;
        const KN_CLIENT_SECRET = process.env.KN_CLIENT_SECRET;
        const KN_REDIRECT_URI = process.env.KN_REDIRECT_URI;

        if (!KN_ISSUER_URL || !KN_CLIENT_ID || !KN_CLIENT_SECRET || !KN_REDIRECT_URI) {
            throw new Error("Missing environment variables");
        }

        const issuer = await Issuer.discover(KN_ISSUER_URL);
        return new issuer.Client({
            client_id: KN_CLIENT_ID,
            client_secret: KN_CLIENT_SECRET,
            redirect_uris: [KN_REDIRECT_URI],
            response_types: ["code"],
        });
    }
}

export default EntreeAuthenticationManager;