import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const generalPropertiesPath = path.resolve(__dirname, '../general.properties');
const versionPath = path.resolve(__dirname,'../generated');

function readGeneralProperties() {
    try {
        const content = fs?.readFileSync(generalPropertiesPath, 'utf-8');
        const lines = content?.split('\n');
        const versionLine = lines?.find(line => line.includes('version'));
        if (versionLine) {
            const version = versionLine?.split('=')[1]?.trim();
            setVersion(version)
            return version;
        } else {
            console.log('version bilgisi general.properties dosyasında bulunamadı.');
        }
    } catch (err) {
        console.log('general.properties dosyasını okuma sırasında bir hata oluştu:', err);
    }
}

function setVersion(version){
    try {
        const _versionJs = path.resolve(versionPath,'./version.js');
        if (!fs.existsSync(_versionJs)){
            fs.mkdirSync(versionPath, { recursive: true });
            fs.writeFileSync(_versionJs,'version= Erdem is Best :)');
        }

        const content = fs?.readFileSync(_versionJs, 'utf-8');
        const lines = content?.split('\n');
        const versionLine = lines?.find(line => line.includes('version'));
        if (versionLine) {
            let splittedLine = versionLine.split('=');
            let stringVersion = version?.toString() || '';
            splittedLine.splice(1,1,`'${stringVersion}'`);
            let currentLine = splittedLine.join('=');

            fs.writeFileSync(_versionJs,currentLine);
        } else {
            console.log('version bilgisi version.js dosyasında bulunamadı.');
        }
    } catch (err) {
        console.log('version.js dosyasını okuma sırasında bir hata oluştu:', err);
    }
}

readGeneralProperties();

