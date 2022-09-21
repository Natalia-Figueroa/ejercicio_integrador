// Esto hay que tenerlo en algun lado,donde no se cambie sino los token viejos van a ser invalidos
exports.secret = "codigosecreto";

const jwt = require("jasonwebtoken");

exports.validateJWT = (req, res, next) => {
  const token = req.headers["auth_token"];
  if (!token) {
    res.status(401).json({ message: "No token found" });
  }
  //   El jwt, si le paso el exports.secret nos va a dejar validar el token
  // la autenticacion se hace con el verify
  jwt.verify(token, exports.secret, (err, decoded) => {
    if (err) {
      // si no se puede verificar el token =>
      return res.status(401).json({ msg: "invalid token" });
    }
    // mostramos que la informacion se haya deshasheado bien // el decoded trae toda la información

    console.log(decoded);
    //el iat da la fecha de creado del token si lo pego en jwt.io y me paro en data
    //lo que se puede hacer es comparar las fechas y si la diferencia es mayor a x no se valida //
    //lo hacemos con compare unix timestamps js
    const tiempo = decoded.iat;
    let ahora = new Date();
    let tokenfecha = new Date(tiempo * 1000);
    let dif = (ahora.getTime() - tokenfecha.getTime()) / 1000;
    if (dif > 60) {
      return res.status(401).json({ msg: "token expirado" });
    }
    console.log("token validado");
    next();
  });
};

// para pedirlo al crear un usuario, tengo que importarlo primero y después le pongo validateJWT
