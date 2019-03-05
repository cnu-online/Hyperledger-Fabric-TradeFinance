var RefData = require("./RefData.json");
module.exports = {
    getOrgByUser(username) {
        var org = '';
        RefData.users.forEach(user => {
            if (user.username == username) {
                org = user.org;
            }
        });
        return org
    },
    getbanks() {
        return getOrgsByType('bnk')
    },
    getCompanies() {
        return getOrgsByType('cmp')
    },
    getRegulators() {
        return getOrgsByType('rgl')
    },
    getOrgsByType(typ) {
        var orgs = [];
        RefData.users.forEach(org => {
            if (org.orgType == typ) {
                orgs.push(org);
            }
        });
        return orgs
    }
    
}