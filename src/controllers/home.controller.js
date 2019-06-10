
const Dashboard = function(req, res){
	let user = req.user.id;
	let name = `${req.user.first} ${req.user.last}`;
	return res.json({success:true, message:'it worked', data:'user name is :' + name});
};
module.exports.Dashboard = Dashboard;