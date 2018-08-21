// If showStats is turned on, then the Status Controlled will be called.  The status controller check for an index, and if it doesn't find one it will create one.
// If there are no names in the index, it will be populated with some.  This is great for getting started, but if you're up and running it will cause extra unneeded cycles.
// It might come in handy.
var showStats = true;

var statusUri = 'api/status/Get';
var searchUri = 'api/babyname/Get';

$(document).ready(function () {
    if (showStats) {
        $.getJSON(statusUri)
            .done(function () {
                $('#statusBox').html();
                $('#statusBix').addClass('alert alert-success');
            })
            .error(function (jqXHR, textStatus, errorThrown) {
                $('#statusBox').html(errorThrown);
                $('#statusBox').addClass('alert alert-danger');
            });
    }
    // This is if the user presses enter on the search box.
    $('#searchText').keydown(function (event) {
        if (event.keyCode == 13) {
            search($('#txtSearch').val());
            return false;
        }
    });
});

// This is the big search Web API call.  All we do is pass the search terms to the search API, and sort htem by name.
function search(name) {
    var isBoyChecked = $('#chkBoys').is(':checked');
    var isGirlChecked = $('#chkGirls').is(':checked');

    var query = searchUri + '?q=' + name;

    if (isBoyChecked && isGirlChecked) {
        query = searchUri + '?q=' + name;
    }
    if (isBoyChecked == true && isGirlChecked == false) {
        query = searchUri + '?q=' + name + '&gender=Male';
    }
    if (isBoyChecked == false && isGirlChecked == true) {
        query = searchUri + '?q=' + name + '&gender=Female';
    }

    $.getJSON(query)
        .done(function data() {
            $('#dataName').empty();
            $('#resultsFound').html("Results Found: " + data.length);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Document.gender == 'Male') {
                    $('#dataName').append();
                }
                if (data[i].Document.gender == 'Female') {
                    $('#dataName').append();
                }
                if (data[i].Document.gender == 'Both') {
                    $('#dataName').append();
                }
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            $('#resultsFound').html("Results Found: 0");
            // This is useful to check the search error.  It's not a great visual for the end user.
            $('#statusBox').html(errorThrown);
            $('#statusBox').addClass("alert alert-danger");
        });
}