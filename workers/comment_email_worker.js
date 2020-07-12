// const queue = require('../config/kue');
// const commentMailer = require('../mailers/comment_mailer');


// queue.process('emails',function(job,done){
//     console.log('Workers are given the work',job.data);
//     commentMailer.newComment(job.data);
//     done();
// });