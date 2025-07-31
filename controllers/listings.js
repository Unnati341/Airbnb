const Listing = require("../models/listing");

module.exports.index = async(req, res) =>{
   const allListings= await Listing.find({});
   res.render("listings/index.ejs",{ allListings });
};

module.exports.renderNewForm =(req, res) =>{ 
   res.render("listings/new.ejs")
};


module.exports.showListing =async(req, res, next) => {
 let{id} = req.params;
 const listing = await Listing.findById(id)
 .populate({
   path:"reviews",
   populate: {
      path : "author",
   },
})

 .populate("owner");
 if(!listing){
    req.flash("error", "Listing you requested for dose not exist!");
   res.redirect("/listings");
 }
 console.log(listing);
 res.render("listings/show.ejs",{ listing });
};

// module.exports.createListing =async (req, res,next) => {
//   let url = req.file.path;
//   let filename = req.file.filename;
  
//    const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id; 
//   newListing.image = {url, filename};
//   await newListing.save();

//    req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
// };

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    newListing.image = { url, filename };
  } else {
    req.flash("error", "Image is required.");
    return res.redirect("/listings/new");
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};
module.exports.renderEditForm = async(req, res,next) =>{
let {id} = req.params;
 const listing = await Listing.findById(id);
 if(!listing){
    req.flash("error", "Listing you requested for dose not exist!");
    return res.redirect("/listings");
 }
 res.render("listings/edit.ejs",{ listing });
};

// module.exports.updateListing = async(req, res) => {
   
//    let {id} = req.params;
//    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

//    if(typeof req.file !== "undefined"){
//    let url = req.file.path;
//   let filename = req.file.filename;
//   listing.image = {url, filename};
//   const image = req.file ? req.file.path : req.body.existingImage;
// await listing.save();
//    }
//    req.flash("success", "Listing Updated!");
//    res.redirect(`/listings/${id}`);
// };

// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;

//   // Find the listing
//   let listing = await Listing.findById(id);

//   // Update all other fields
//   listing.title = req.body.listing.title;
//   listing.description = req.body.listing.description;
//   listing.price = req.body.listing.price;
//   listing.location = req.body.listing.location;
//   listing.country = req.body.listing.country;

//   // ✅ Handle image
//   if (req.file) {
//     // New image uploaded
//     listing.image = req.file.path; // If storing as string path
//   } else {
//     // No new image — use existing image
//     listing.image = req.body.existingImage;
//   }

//   // ✅ Save the updated listing
//   await listing.save();

//   req.flash("success", "Listing updated!");
//   res.redirect(`/listings/${listing._id}`);
// };

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.location = req.body.listing.location;
  listing.country = req.body.listing.country;

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  } else if (req.body.existingImage) {
    listing.image = {
      url: req.body.existingImage,
      filename: listing.image.filename
    };
  } else {
    req.flash("error", "Image is required.");
    return res.redirect(`/listings/${id}/edit`);
  }

  await listing.save();
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyeListing = async(req, res) =>{
  let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 req.flash("success", "Listing Deleted!");
res.redirect("/listings");
};