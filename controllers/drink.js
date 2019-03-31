const mongoose = require('mongoose');
const Drink = mongoose.model('Drink');


//== Create ==//
// GET drink
exports.addDrink = (req, res) => {
    res.render('editDrink', {title: 'Add Drink'});
}

// POST
 exports.postDrink = async (req, res) => {
    const drink = await (new Drink(req.body)).save();
    req.flash('sucess', `Added ${drink.name}`);
    res.redirect(`/drinks/${drink.slug}`)

 }

//== Edit ==//
//GET
exports.editDrink = async (req, res) {
    const drink = await Drink.findOne({_id: req.params._id});
    if (drink === null) {
        res.flash('error','It appears this drink doesn\'t exist. Let\'s make one!');
        res.redirect('/drinks/add')
    }
    res.render('drink', {title: `${drink.name}`, drink});
}
// POST
exports.updateDrink = async (req, res) {
    const drink = await Drink.findOneAndUpdate({_id: req.params._id}, req.body, {
        new: true,
        runValidators: true
    }).exec();
    req.flash('sucess', `Updated ${drink.name}`);
    req.redirect(`/drinks/${drink._id}/edit`);
}



 // flash types: sucess, failure, info, warning