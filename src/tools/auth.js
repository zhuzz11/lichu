module.exports = {
	checkAuth: function(req, res) {
		if (!req.session.userInfo) {
			res.end(JSON.stringify({
				resultCode: "402",
				msg: "你没有访问权限。"
			}));
			return;
		}
		return true;
	}
};