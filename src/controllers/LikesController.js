const Dev = require('../models/Dev')
module.exports = {
  async store(req, res) {

    console.log(req.io, req.usersConected);
    const { idDev } = req.params;
    const { user } = req.headers;
    
    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(idDev);

    if(!targetDev){
      return res.status(400).json({error: 'Dev not exists'})
    }
    if(targetDev.likes.includes(loggedDev._id)){
      const loggedSocket = req.usersConected[user];
      const targetSocket = req.usersConected[idDev];

      if(loggedSocket) {
        req.io.to(loggedSocket).emit('match', loggedDev);
      }
      if(targetSocket) {
        req.io.to(targetSocket).emit('match', targetDev);
      }
    }

    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    return res.json(loggedDev)
  }
}