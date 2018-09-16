/**
 * Created by gabrieldyck on 04/05/17.
 */
/**
 * Created by gabrieldyck on 29/01/17.
 */

app.service("imageService", [function () {


    var b64ToBlob = function b64toBlob(b64data, sliceSize) {
        var encode = b64data.split('data:')[1];
        if (encode != null) {
            var contentType = encode.split(';')[0];
            var data = encode.split(';base64,')[1];
            var sliceSize = sliceSize || 512;
            var byteCharacters = atob(data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }


            var blob = new Blob(byteArrays, {type: contentType});


            return {
                blob: blob,
                blobUrl: URL.createObjectURL(blob),
                data: byteArrays
            }
        }


    };

    var base64ToArrayBuffer = function base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    return {
        b64ToBlob: b64ToBlob,
        base64ToArrayBuffer: base64ToArrayBuffer
    }

}]);