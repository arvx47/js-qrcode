// @flow

// export { default as QRCodeCanvas } from './QRCodeCanvas';
// export { default as QRCodeRaw } from './QRCodeRaw';
// export { default as QRCodeSVG } from './QRCodeSVG';
// export { default as QRCodeText } from './QRCodeText';

import QRCodeSVG from './QRCodeSVG';
import QRCodeCanvas from './QRCodeCanvas';

const dataImage = 'data:image/jpeg;base64,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';

const qrcode = new QRCodeSVG(
    'Alexander Cheprasov',
    {
        level: 'L',
        padding: 0,
        image: {
            source: dataImage,
            x: 'center',
            y: 'center',
            width: '40%',
            height: '40%',
            border: 1,
        },
    },
);

document.writeln('<img src="' + qrcode.toDataUrl() + '" width="300" />');

const qrc = new QRCodeCanvas(
    'Alexander Cheprasov kh kjh kjh kjh kjh kjh kjh kjh kjh khj kjh kjh kjh kjh kjh kjh kjh kjh kjh kjh ',
    {
        level: 'H',
        padding: 0,
        scale: 12,
        bgColor: '#fffa',
        image: {
            source: dataImage,
            x: 'center',
            y: 'center',
            width: '40%',
            height: '40%',
            border: 1,
        },
    },
);


document.body.onload = () => {
    qrc.getCanvas().then((canvas) => {
        document.body.appendChild(canvas);
    });
};

document.body.onload = () => {
    qrc.toDataUrl().then((dataUrl) => {
        console.log(dataUrl);
    });
};

//document.writeln('<img src="' + qrc.getCanvas() + '" width="300"/>');
