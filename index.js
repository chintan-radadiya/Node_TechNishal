let express = require("express");
require("dotenv").config();
let app = express();
app.use(express.json()); // the most important

let product = [];

app.post("/createProduct", (req, res) => {
  try {
    // to push the data in array we need req.body
    let body = req.body;

    // adding a new id in object
    body.id = product.length + 1;

    // pushing the body in product array
    product.push(body);
    console.log(product);
    res.status(200).send("Product added sucessfully.");
    // console.log(req.body);
  } catch (err) {
    res.status(500).send({ isSuccess: false, msg: "Internal server error" });
  }
});

app.get("/getProductdata", (req, res) => {
  res.send(product); // list of product added
});

app.get("/hello", (req, res) => {
  try {
    console.log("name", req.query);
    let name = req.query.name; // query in URl
    console.log(name);
    res.status(200).send(`Hello ${name}`);
  } catch (err) {
    res.status(500).send({ isSuccess: false, msg: "Internal server error." });
  }
});

app.get("/hello2/:age", (req, res) => {
  let name = req.params.name; // Param in url
  let age = req.params.age;
  res.send("your age " + age);
});

app.put("/updateProduct", (req, res) => {
  try {
    let id = req.query.id; //finding the product from added product using product id
    // we can find using filter and find both
    let searchProduct = product.find((val) => {
      return val.id == id;
    });

    if (searchProduct.isDeleted == true) {
      res.status(404).send("Product not found.");
    } else {
      let newName = req.body;
      searchProduct.name = newName.name ? newName.name : searchProduct.name;
      searchProduct.Cost = newName.Cost ? newName.Cost : searchProduct.Cost;
      searchProduct.Description = newName.Description
        ? newName.Description
        : searchProduct.Description;

      res.status(200).send("Product updated successfully.");
    }
  } catch (err) {
    res.status(500).send({ isSuccess: false, msg: "internal server error" });
  }
});

app.delete("/deleteProduct", (req, res) => {
  try {
    let id1 = req.query.id;

    // console.log(id1);

    let idx = product.findIndex((val) => val.id == id1);

    product.splice(idx, 1);

    console.log(product);
    res.status(200).send("Product deleted successfully.");
  } catch (err) {
    res.status(500).send({ isSuccess: false, msg: "internal server error" });
  }
});

app.put("/softDelete", (req, res) => {
  try {
    let id = req.query.id;

    let idx = product.find((val) => val.id == id);

    idx.isDeleted = true;

    console.log(product);
    res.status(200).send("Soft Delete is done succesfully.");
  } catch (err) {
    res.status(500).send({ isSuccess: false, msg: "internal server error" });
  }
});

app.get("/getHello", (req, res) => {
  res.send("Hello"); // testing get request for first connection
});

app.get("/afterSoftDelete", (req, res) => {
  try {
    let final = product.filter((val) => {
      if (val.isDeleted == false) {
        return true;
      }
    });
  } catch (err) {
    res.status(500).send({ isSuccess: false, msg: "internal server error" });
  }
});

app.get("/sortProduct", (req, res) => {
  try{
  let order = req.query.sort;
let sorted;
  if (order = "asc") {
     sorted = product.sort((a, b) => {
      return a.Cost - b.Cost;
    });
  } else if ((order = "dsc")) {
     sorted = product.sort((a, b) => {
      return b.Cost - a.Cost;
    });
  } else {
    res.status(404).send("Wrong order");
  }
  console.log(sorted);
  res.status(200).send(sorted);
}
catch (err) {
  res.status(500).send({ isSuccess: false, msg: "internal server error" });
}
});

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("Server is running on port number " + process.env.PORT);
  }
});
