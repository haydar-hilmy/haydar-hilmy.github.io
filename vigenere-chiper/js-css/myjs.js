$(document).ready(function () {
    // DEAFULT READY
    $("#alert-box-enc-success").hide();
    $("#alert-box-dec-success").hide();
    $("#alert-box-enc-info").hide();
    $("#alert-box-dec-info").hide();
    $("#alert-box-enc-danger").hide();
    $("#alert-box-dec-danger").hide();

    $("#result-chiper").click(function () {
        if ($("#plaintext_encrypt").val() != "" && $("#keycode_encrypt").val() != "") {
            $("#result-chiper").select();
            navigator.clipboard.writeText($("#result-chiper").text());
            $("#alert-box-enc-success").show(100);
            $("#alert-box-enc-info").hide(100);
            $("#alert-text-enc-success").text("Text Copied");
        }
    });

    $("#result-plaintxt").click(function () {
        if ($("#chipper_code").val() != "" && $("#keycode_decrypt").val() != "") {
            $("#result-plaintxt").select();
            navigator.clipboard.writeText($("#result-plaintxt").text());
            $("#alert-box-dec-success").show(100);
            $("#alert-box-dec-info").hide(100);
            $("#alert-text-dec-success").text("Text Copied");
        }
    });

    $("#alert-box-enc-success").click(function () {
        $("#alert-box-enc-success").hide(100);
    });
    $("#alert-box-dec-success").click(function () {
        $("#alert-box-dec-success").hide(100);
    });
    $("#alert-box-enc-danger").click(function () {
        $("#alert-box-enc-danger").hide(100);
    });
    $("#alert-box-dec-danger").click(function () {
        $("#alert-box-dec-danger").hide(100);
    });
    $("#alert-box-enc-info").click(function () {
        $("#result-chiper").select();
        navigator.clipboard.writeText($("#result-chiper").text());
        $("#alert-box-enc-success").show(100);
        $("#alert-box-enc-info").hide(100);
        $("#alert-text-enc-success").text("Text Copied");
    });
    $("#alert-box-dec-info").click(function () {
        $("#result-plaintxt").select();
        navigator.clipboard.writeText($("#result-plaintxt").text());
        $("#alert-box-dec-success").show(100);
        $("#alert-box-dec-info").hide(100);
        $("#alert-text-dec-success").text("Text Copied");
    });

    // ====================== PROCESSING CHIPER TEXT ========================

    // LOOPING KEYCODE TO PLAINTEXT LENGTH
    function looping_key_plain_length(par1, par2) {
        var showup = "";
        let k = 0;
        for (let j = 0; j < par1.length; j++) {

            console.log("do J = ", j, "dan k =", k);
            console.log("Melakukan array dari mykey[] ke ", k, " atau ", par2[k]);

            showup += par2[k];

            console.log("addition mykey[k] jadi --> ", showup);

            // mykkey.length - 1 karena panjang string dihitung mulai dari angka 1 bukan 0
            if (k < par2.length - 1) {
                k++;
                console.log("k++, k <", par2.length - 1, "/k < mykey.length");
            } else if (k >= par2.length - 1) {
                k = 0;
                console.log("k lebih dari", par2.length - 1, " --> k = ", k);
            }

            console.log("k akhiran: " + k);
            console.log("print", showup);
        }
        return showup;
    }
    // END LOOPING KEYCODE TO PLAINTEXT LENGTH

    // CONVERT INTO DECIMAL
    function conv_into_dec(par) {
        let result_conv_into_dec = "";
        for (let r = 0; r < par.length; r++) {
            let conv_par = par.charCodeAt(r);
            conv_par = conv_par - 65;
            result_conv_into_dec += conv_par + " ";
        }
        return result_conv_into_dec;
    }
    // END CON INTO DEC

    // ================== ENCRYPT ==================
    $("#encrypt").click(function () {
        if ($("#plaintext_encrypt").val() != "" && $("#keycode_encrypt").val() != "") {
            var myplaintxt = $("#plaintext_encrypt").val();
            var mykey = $("#keycode_encrypt").val();

            // LOOPING KEYCODE SAME AS PLAINTEXT LENGTH
            const myshowup = looping_key_plain_length(myplaintxt, mykey);

            // CONVERT PLAINTEXT INTO DECIMAL
            let result_conv_plain = conv_into_dec(myplaintxt);

            // CONVERT KEYCODE INTO DECIMAL
            let result_conv_mykey = conv_into_dec(myshowup);



            // PENAMBAHAN PLAINTEXT DENGAN KEYCODE
            let add_plaintxt_mykey = "";
            let mod_result = "";
            let mychipper = "";
            for (let rq = 0; rq < myplaintxt.length; rq++) {
                const split_conv_mykey = result_conv_mykey.split(" ");
                const split_conv_myplaintext = result_conv_plain.split(" ");

                split_conv_mykey.pop();
                let conv_dec_mykey = parseInt(split_conv_mykey[rq]);

                split_conv_myplaintext.pop();
                let conv_dec_myplaintext = parseInt(split_conv_myplaintext[rq]);

                // PENAMBAHAN
                let result_adding = conv_dec_mykey + conv_dec_myplaintext;

                // MODULUS 26
                let result_modulus = result_adding % 26;
                add_plaintxt_mykey += result_adding + " ";
                console.log("Hasil mod 26", result_modulus);

                // ADDING 65 DEC AND THEN CONVERT INTO CHAR
                let dec_chip_added = result_modulus + 65;

                mychipper += String.fromCharCode(dec_chip_added);
                console.log("decimal char", String.fromCharCode(dec_chip_added), "->", dec_chip_added);
                console.log("hasil mod", result_modulus);

                mod_result += result_modulus + " ";

            }

            // MODULUS HASIL PENJUMLAHAN

            // ========= PRINT RESULT ========
            $("#result-chiper").text(mychipper);

            // SHOW INFO
            $("#alert-box-enc-info").show(100);

            $("#alert-box-enc-success").hide(100);
        }

    });// END CLICK ENCRYPT



    // ================== DECRYPT ==================
    $("#decrypt").click(function () {
        if ($("#chipper_code").val() != "" && $("#keycode_decrypt").val() != "") {
            var chipper_code = $("#chipper_code").val();
            var mykey_decoder = $("#keycode_decrypt").val();

            const myshowup_decoder = looping_key_plain_length(chipper_code, mykey_decoder);

            // CONVERT CHIPER INTO DECIMAL
            let result_conv_chipper = conv_into_dec(chipper_code);

            // CONVERT KEYCODE INTO DECIMAL
            let result_conv_mykey = conv_into_dec(myshowup_decoder);


            // PENGURANGAN CHAR CHIPER DENGAN KUNCI LALU DI MODULUS DENGAN 26 
            // LALU KETEMU HASIL DECIMAL CHAR PLAINTXT

            // SPLIT CHIPER STRING MENJADI DECIMAL
            let splitted_chiper_decrypt = result_conv_chipper.split(" ");
            // HILANGKAN SPASI PALING BELAKANG
            splitted_chiper_decrypt.pop();

            // SPLIT KEYCODE STRING MENJADI DECIMAL
            let splitted_keycode_decrypt = result_conv_mykey.split(" ");
            // HILANGKAN SPASI PALING BELAKANG
            splitted_keycode_decrypt.pop();

            // KALKULASI TAHAP 1 --> PENGURANGAN CHIPER DENGAN KEYCODE DAN TAMBAH 26 
            // KALKULASI TAHAP 2 --> MASING2 HASIL PENGURANGAN DIMODULUS 26
            var final_plaintxt_decrypt = "";
            var result_dec_plain_decrypt = "";
            for (let r = 0; r < chipper_code.length; r++) {
                // PENGURANGAN DAN DITAMBAH 26
                let mysubstraction = splitted_chiper_decrypt[r] - splitted_keycode_decrypt[r] + 26;
                console.log("subs", mysubstraction);
                // MODULUS 26
                mysubstraction = mysubstraction % 26;
                console.log("mod 26", mysubstraction);
                // HILANGKAN TANDA MINUS
                mysubstraction = Math.abs(mysubstraction);
                console.log("math abs", mysubstraction);
                // KONVERSI DECIMAL KE CHAR DENGAN TAMBAH 65 DAHULU
                mysubstraction = mysubstraction + 65;
                console.log("+65 ->", mysubstraction);
                final_plaintxt_decrypt += String.fromCharCode(mysubstraction);
                console.log("final char ->", final_plaintxt_decrypt);

                mysubstraction = mysubstraction - 65;
                console.log("final mysubstraction", mysubstraction);
                // result_dec_plain_decrypt += mysubstraction + " ";
                if (r % 2 == 0) {
                    result_dec_plain_decrypt += "'" + mysubstraction + "' ";
                } else {
                    result_dec_plain_decrypt += mysubstraction + " ";
                }
            }
            $("#result-plaintxt").text(final_plaintxt_decrypt);

            // SHOW INFO
            $("#alert-box-dec-info").show(100);

            $("#alert-box-dec-success").hide(100);
        }

    });// END CLICK DECRYPT


});

function myUpperCase_left(inp) {
    let mytext = inp.value;
    let hasil = mytext.toUpperCase();
    inp.value = hasil;
    if (inp.value.indexOf(' ') >= 0) {
        inp.value = inp.value.replace(/\s/g, '');
    };
    $(document).ready(function () {
        if (!/^[A-Za-z]+$/.test(inp.value)) {
            $("#alert-box-enc-danger").show(100);
        } else {
            $("#alert-box-enc-danger").hide(100);
        }
    });

}
function myUpperCase_right(inp) {
    let mytext = inp.value;
    let hasil = mytext.toUpperCase();
    inp.value = hasil;
    if (inp.value.indexOf(' ') >= 0) {
        inp.value = inp.value.replace(/\s/g, '');
    };
    $(document).ready(function () {
        if (!/^[A-Za-z]+$/.test(inp.value)) {
            $("#alert-box-dec-danger").show(100);
        } else {
            $("#alert-box-dec-danger").hide(100);
        }
    });

}
function rate_value(myval){
    $(document).ready(function(){
        var val_rate = document.getElementById("val-of-rate");
        if(myval.value < 10){
            val_rate.innerHTML = myval.value + "&#128557 sorry about that";
        } else if(myval.value < 20){
            val_rate.innerHTML = myval.value + "&#128549 please don't do that";
        } else if(myval.value < 30){
            val_rate.innerHTML = myval.value + "&#128547 enoughh!";
        } else if(myval.value < 40){
            val_rate.innerHTML = myval.value + "&#128543";
        } else if(myval.value < 45){
            val_rate.innerHTML = myval.value + "&#128528";
        } else if(myval.value < 50){
            val_rate.innerHTML = myval.value + "&#128542";
        } else if(myval.value < 60){
            val_rate.innerHTML = myval.value + "&#128529 ok";
        } else if(myval.value < 70){
            val_rate.innerHTML = myval.value + "&#128522";
        } else if(myval.value < 80){
            val_rate.innerHTML = myval.value + "&#128519";
        } else if(myval.value < 90){
            val_rate.innerHTML = myval.value + "&#128518 my dreams";
        } else if(myval.value < 95){
            val_rate.innerHTML = myval.value + "&#128514 thanks a lot!";
        } else if(myval.value >= 90){
            val_rate.innerHTML = myval.value + "&#128526 ayay bro";
        }
    });
}