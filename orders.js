/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($){
    "use strict";

    $(document).ready(function(){

        var $objects = {
            table: $('.notifications .orders tbody'),
            counter: $('.notifications .counter'),
            titleLink: $('.notifications .title-link'),
            notifications: $('.notifications'),
            orders: $('.notifications .orders')
        };
        var counter = 0;

        if(typeof(Worker) !== "undefined"){

            var w = new Worker("/sites/all/themes/rational/js/worker.js");
            var snd = new Audio("/sites/all/themes/rational/audio/confirm.mp3");

            //$.ajax({
            //    url: '/new-orders',
            //    success: function(e){
            //        var orders = JSON.parse(e);
            //        //console.log(orders);
            //        var rows = '';
            //        $.each(orders, function(i,el){
            //            //console.log(el);
            //            counter++;
            //            var name = 'Заказ №' + el.order_number;
            //            var date = el.created;
            //            var order = '<div class="order">' +
            //                '<a href="/admin/commerce/orders/' + el.order_number + '">' +
            //                '<p class="order-id">' + name + '</p>' +
            //                '<p class="date">' + date + '.2017 г.</p>' +
            //                '</a></div>'
            //            var row = '<tr><td>' + order + '</td></tr>';
            //            rows = row + rows;
            //        });
            //        $objects.counter.addClass('active').text(counter);
            //        $objects.table.append(rows);
            //    },
            //    error: function(e){
            //        console.log(e);
            //    },
            //    complete: function(){
            //        w.postMessage(counter);
            //    }
            //});

            w.addEventListener('message', function(e){
                var orders = e.data;
                var rows = '';

                if(counter != orders.length){
                    snd.play();
                    snd.currentTime = 0;
                }

                //var orders = JSON.parse(e);
                //console.log(orders);

                $.each(orders, function(i,el) {
                    //console.log(el);
                    counter++;
                    var name = 'Заказ №' + el.order_number;
                    var date = el.created;
                    var order = '<div class="order">' +
                        '<a href="/admin/commerce/orders/' + el.order_number + '">' +
                        '<p class="order-id">' + name + '</p>' +
                        '<p class="date">' + date + '.2017 г.</p>' +
                        '</a></div>'
                    var row = '<tr><td>' + order + '</td></tr>';
                    rows = row + rows;
                });

                $objects.counter.addClass('active').text(orders.length);
                $objects.table.find('tr').each(function(i, el){
                    $(el).detach();
                });
                $objects.table.append(rows);
                counter = e.data.length;
                this.postMessage(counter);
            });

            //w.addEventListener('message', function(e){
            //    console.log("Got this data from worker: " + e.data);
            //    if(e.data != "break"){
            //        counter++;
            //        var span = '<span>' + counter + '</span>';
            //        $objects.counter.addClass('active').text(counter);
            //        snd.play();
            //        snd.currentTime = 0;
            //        var data = JSON.parse(e.data);
            //        var row = '<tr><td>' + data.name + '</td><td>' + data.age + '</td></tr>';
            //        $objects.table.append(row);
            //    }else{
            //        counter = 0;
            //        $objects.counter.removeClass('active').text(counter);
            //        $objects.table.find('tr').each(function(i,el){
            //            $(el).detach();
            //        });
            //    }
            //});
        }else{
            console.log(w);
        }
    });

    /*==============END OF FUNCTIONS==================*/
}(jQuery));
