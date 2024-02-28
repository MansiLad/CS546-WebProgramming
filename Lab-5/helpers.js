//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
module.exports = {
    checkId(id) {
        if(id == null || id == undefined || isNaN(id) || id % 1 != 0 || id < 0){
            res.status(400).json({ error: 'Invalid ID in URL' });
            return;
        }
        return id;
    },
};