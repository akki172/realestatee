const handleWishlist = async () => {

    try {

        const userId = 1; // Temporary (later we'll use JWT)

        await addToWishlist(userId, property.id);

        alert("❤️ Property added to Wishlist!");

    } catch (error) {

        console.log(error);

        alert("Unable to add to Wishlist");

    }

};