$(document).ready(function () {
    function sellAsset() {
        let target = $(this);

        let row = target.parents('tr');
        let id = target.attr('id').replace('asset-sell-','');

        row.remove();

    }

    $("img[id*='asset-sell']").click(sellAsset);
});