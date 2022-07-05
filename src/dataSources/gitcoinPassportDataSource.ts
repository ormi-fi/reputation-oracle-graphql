import { PassportReader, CeramicPassport } from '@gitcoinco/passport-sdk-reader';
import { Passport } from '@gitcoinco/passport-sdk-types';
import { DataSource } from 'apollo-datasource';
import 'dotenv/config';

const ceramicNodeUrl = process.env.CERAMIC_NODE_URL || '';
const ceramicNetwork = '1'; // Single network. Hardcoded for now.

class GitcoinPassportAPI extends DataSource { 
    reader: PassportReader;
    constructor(ceramicNodeUrl: string, ceramicNetwork: string) {
        super();
        this.reader = new PassportReader(ceramicNodeUrl, ceramicNetwork);
    }

    // Gets the fully hydrated passport. Returns false if no data
    getPassport = async (ethereumAddress: string): Promise<CeramicPassport | Passport | false> => {
        return await this.reader.getPassport(ethereumAddress);
    }
}

export const gitcoinPassportAPI = new GitcoinPassportAPI(ceramicNodeUrl, ceramicNetwork);
