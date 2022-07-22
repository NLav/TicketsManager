const router = require('express').Router();
const config = require('config');
var generator = require('generate-password');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: config.get('email.smtpHost'),
  port: config.get('email.smtpPort'),
  secure: true,
  auth: {
    user: config.get('email.user'),
    pass: config.get('email.password'),
  },
});

//Generate tempPassword and Send to userMail
router.post('/sendmail', (req, res) => {
  var tempPassword = generator.generate({
    length: 10,
    numbers: true,
  });

  const emailAdress = req.body.email;

  var mailOptions = {
    from: 'chamados@favarin.net',
    to: emailAdress,
    subject: 'Redefinição de senha',
    html:
      '<body style="font-family:verdana">' +
      '<h2>Olá</h2>' +
      '<h4>Esse é um e-mail automático enviado para redefinição de senha.</h4>' +
      '<ol>' +
      '<li>' +
      '<h4>' +
      'Acesse ' +
      '<a href="https://www.favarin.net/gerenciadordechamados"' +
      '>https://www.favarin.net/gerenciadordechamados</a' +
      '>' +
      '</h4>' +
      '</li>' +
      '<li>' +
      '<h4>' +
      'Insira seu e-mail de costume no campo E-mail, e no campo Senha, insira o código ' +
      `<b><u>${tempPassword}</u></b>` +
      '</h4>' +
      '</li>' +
      '<li>' +
      '<h4>Você será redirecionado para uma tela onde poderá criar uma nova senha</h4>' +
      '</li>' +
      '<li>' +
      '<h4>' +
      'Após a criação da nova senha, você voltará para a tela de Login onde deverá usar a nova senha' +
      '</h4>' +
      '</li>' +
      '</ol>' +
      '<h4 style="color: red">ATENÇÃO, O CÓDIGO É VÁLIDO POR 30 MINUTOS APÓS A SOLICITAÇÃO</h4>' +
      '<h4>Caso não tenha solicitado a redefinição da sua senha, apenas ignore este e-mail.</h4>' +
      '</body>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send(tempPassword);
    }
  });
});

module.exports = router;
