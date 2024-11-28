import {convert} from "html-to-text";

export const auditLogsTruncateTexts = (text: string, length = 25) => {
    const plainText = convert(text, {
        wordwrap: false, // Prevent automatic line wrapping
    });

    if (plainText.length <= length) return plainText;

    return plainText.substring(0, length) + ".....";
};

