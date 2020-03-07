$(document).ready(function () {
    function buyItem() {
        let target = $(this);

        let row = target.parents('tr');
        let id = target.attr('id').replace('marketitem-buy-','');

        row.remove();

    }

    $("img[id*='marketitem-buy']").click(buyItem);
});