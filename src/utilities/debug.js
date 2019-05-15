
const Debug = {

    toConsole: true,
    toFile: false,

    LogRequest: (req) => {
        const url = req.url;
        const method = req.method;
        const body = req.body;
        const params = req.params;

        Debug.Log(method + ": " + url);
        Debug.Log("BODY:");
        Debug.LogDir(body);
        Debug.Log("PARAMS: ");
        Debug.LogDir(params);
        Debug.Log("---------------------------------------------------------------");
    },
    LogResponse: (res) => {
        Debug.Log("RESPONSE: ");
        Debug.LogDir(res);
        Debug.Log("---------------------------------------------------------------");
    },
    LogDir: (input) => {
        if (Debug.toConsole)
            console.dir(input);

        if (Debug.toFile) {
            console.log(input.toString());
        }
    },
    Log: (input) => {
        if (Debug.toConsole)
            console.log(input);

        if (Debug.toFile) {
            console.log(input.toString());
        }
    }// end Log()
}// end Debug

module.exports = { Debug }