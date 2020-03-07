$(document).ready(function () {

    function insertWishlist(data) {
        let id = data._id;
        let name = data.name;
        $('.table-wishlist > tbody')
        .prepend(`<tr id='wishlist-${id}'>
                <td>${name}</td>
                <td><img id='remove-wishlist-button-${id}' src='img/remove_logo.png' alt='remove_logo'></td>
                </tr>`);
    }

    function searchAssets() {
        $.post('/dashboard/dashboard-wishlist/search', { search : $('#wishlist-search').val() })
         .done(function (data, status, res) {
            if(data.length !== 0)
                insertWishlist(data);
            $('#wishlist-search').val('');
        }).fail(function (req, status, err) {
            console.log(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })
    }

    $('#wishlist-search').keypress(function(event) {
        if (event.keyCode == 13) {
            searchAssets();
        }
    });

    function removeWishList() {
        let target = $(this);

        let row = target.parents('tr');
        let id = target.attr('id').replace('remove-wishlist-button-','');

        $.ajax({
            url: '/dashboard/dashboard-wishlist/delete',
            type: 'DELETE',
            data: {_id: id},
        }).done(function (data, status, req) {
            row.remove();
        }).fail(function (req, status, err) {
            console.log(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })
    }

    $("img[id*='remove-wishlist-button']").click(removeWishList);
});