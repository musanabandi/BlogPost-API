class Response {

    /**
     * 
     * succes message
     * @body res, message, data, status
     * @return status, message 
     */

    static successMessage(res, message, data = null, status){

        res.status(status).json(
            data?//niba ari true izaduha zino data
            {
                status:status,
                message,
                data
            }
            ://niba nta data dufite izaduha ino message
            {
                status:status,
                message,
            }
        )
    }
    static errorMessage(res, error, status){

        res.status(status).json(
            {
                status:status,
                error
            }
        )
    }
}
export default Response;