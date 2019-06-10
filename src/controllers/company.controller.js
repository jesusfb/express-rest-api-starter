const {Company} = require('../models');
const {to, ErrorResponse, SuccessResponse} = require('../services/util.service');

module.exports.create = async (req, res) => {
    let err, company;
    let user = req.user;

    let company_info = req.body;

    [err, company] = await to(Company.create(company_info));
    if (err) return ErrorResponse(res, err, 422);

    company.addUser(user, {through: {status: 'started'}})

        [err, company] = await to(company.save());
    if (err) return ErrorResponse(res, err, 422);

    let company_json = company.toWeb();
    company_json.users = [{user: user.id}];

    return SuccessResponse(res, {company: company_json}, 201);
};

module.exports.getAll = async (req, res) => {
    let user = req.user;
    let err, companies;

    [err, companies] = await to(user.getCompanies({include: [{association: Company.Users}]}));

    let companies_json = [];
    for (let i in companies) {
        let company = companies[i];
        let users = company.Users;
        let company_info = company.toWeb();
        let users_info = [];
        for (let i in users) {
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user: user.id});
        }
        company_info.users = users_info;
        companies_json.push(company_info);
    }

    return SuccessResponse(res, {companies: companies_json});
};

module.exports.get = (req, res) => {
    let company = req.company;

    return SuccessResponse(res, {company: company.toWeb()});
};

module.exports.update = async (req, res) => {
    let err, company, data;
    company = req.company;
    data = req.body;
    company.set(data);

    [err, company] = await to(company.save());
    if (err) {
        return ErrorResponse(res, err);
    }
    return SuccessResponse(res, {company: company.toWeb()});
};

module.exports.remove = async (req, res) => {
    let company, err;
    company = req.company;

    [err, company] = await to(company.destroy());
    if (err) return ErrorResponse(res, 'error occured trying to delete the company');

    return SuccessResponse(res, {message: 'Deleted Company'}, 204);
};