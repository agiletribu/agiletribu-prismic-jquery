Handlebars.registerHelper('asHtml', function(item) {
    var html = "";
    _.forEach(item.value, function(value) {
        if(value.type == "paragraph") {
            var value_html = value.text;
            var value_array = _.toArray(value.text);

            _.forEach(value.spans, function(span){
                var first_slice = _.slice(value_array, 0, span.start);
                var second_slice = _.slice(value_array, span.start, span.end);
                var third_slice = _.slice(value_array, span.end);

                value_array = _.concat(first_slice, '<' + span.type + '>', second_slice, '</' + span.type + '>', third_slice);
                value_html = _.toString(value_array);
                console.log(value_array);
            });

            html = html + '<p>' + value_html + '</p>';
        }
    });
    console.log(html);
    return html;
});