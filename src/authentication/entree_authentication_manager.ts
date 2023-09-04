import { Request } from "express";
import { BaseClient, Issuer } from "openid-client";

/**
 * This class is responsible for managing the authentication process with Entree.
 */
class EntreeAuthenticationManager {   
    /**
     * The client used to communicate with Entree.
     */
    private client?: BaseClient;

    /**
     * Initializes the client used to communicate with Entree.
     */
    public async initializeClient() {
        const KN_ISSUER_URL = process.env.KN_ISSUER_URL;
        const KN_CLIENT_ID = process.env.KN_CLIENT_ID;
        const KN_CLIENT_SECRET = process.env.KN_CLIENT_SECRET;
        const KN_REDIRECT_URI = process.env.KN_REDIRECT_URI;

        if (!KN_ISSUER_URL || !KN_CLIENT_ID || !KN_CLIENT_SECRET || !KN_REDIRECT_URI) {
            throw new Error("Missing environment variables");
        }

        const issuer = await Issuer.discover(KN_ISSUER_URL);
        this.client = new issuer.Client({
            client_id: KN_CLIENT_ID,
            client_secret: KN_CLIENT_SECRET,
            redirect_uris: [KN_REDIRECT_URI],
            response_types: ["code"],
        });
    }

    /**
     * Gets the client used to communicate with Entree.
     * @returns The client used to communicate with Entree.
     */
    public getClient(): BaseClient {
        if (!this.client) {
            throw new Error("Client not initialized");   
        }

        return this.client!;
    }

    /**
     * Gets the access and refresh tokens used to authenticate with Entree.
     * @param req The request object.
     * @returns The access and refresh tokens used to authenticate with Entree.
     */
    public async getTokens(req: Request): Promise<any> {
        const params = this.getClient().callbackParams(req);
        const tokenSet = await this.getClient().callback(process.env.KN_REDIRECT_URI, params);

        return tokenSet;
    }

    /**
     * Refreshes the access token.
     * @returns The new access and refresh tokens.
     */
    public async refreshTokens(refreshToken: string): Promise<any> {
        const tokenSet = await this.getClient().refresh(refreshToken);

        return tokenSet;
    }
}

export default EntreeAuthenticationManager;