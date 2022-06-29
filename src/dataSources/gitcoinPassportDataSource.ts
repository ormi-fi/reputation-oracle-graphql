import { PassportReader, CeramicPassportRecord, CeramicPassportStream } from '@gitcoinco/passport-sdk-reader';
import { DataSource } from 'apollo-datasource';
import 'dotenv/config'

const ceramicNodeUrl = process.env.CERAMIC_NODE_URL;
const ceramicNetwork = '1'; // Single network. Hardcoded for now.

class GitcoinPassportAPI extends DataSource { 
    reader: PassportReader;
    constructor(ceramicNodeUrl: string, ceramicNetwork: string) {
        super();
        this.reader = new PassportReader(ceramicNodeUrl, ceramicNetwork);
    }

    // Gets the fully hydrated passport. Returns false if no data
    getPassport = async (ethereumAddress: string): Promise<CeramicPassportStream | CeramicPassportRecord | false> => {
        const passport = await this.reader.getPassport(ethereumAddress);
        console.log('passport', passport);
        // TODO will
        return passport;
    }
}

export const gitcoinPassportAPI = new GitcoinPassportAPI(ceramicNodeUrl, ceramicNetwork);
