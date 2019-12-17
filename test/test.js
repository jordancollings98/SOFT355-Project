
function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        var event = new MouseEvent("click", {view: window, cancelable: true, bubbles: true});
        element.dispatchEvent(event);
    }
}

function rgb2hex(color) {
    var digits = /(.*?)rgba\((\d+), (\d+), (\d+), (\d+)\)/.exec(color);
    if (digits == null) {
        digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    }
    var red = parseInt(digits[2],10);
    var green = parseInt(digits[3],10);
    var blue = parseInt(digits[4],10);
    var rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}

suite("CSS test suite", function() {
	test("Div background grey", function(){
	var topBar = rgb2hex($("#top-bar").css("background-color"));
	chai.assert.equal(topBar, "#808080", "wrong colour");
	
	});
	test("Login button text is white", function(){
	var loginButton = rgb2hex($("#btnLogin").css("color"));
	chai.assert.equal(loginButton, "#ffffff", "Wrong Colour");
	
	});
	test("Black Div is 300px high", function(){
	var blackBar = ($("#top-mid-left").css("height"));
	chai.assert.equal(blackBar, "300px", "Wrong height");
	
	});
	
	test("Calendar div is 600px high", function(){
	var midRightHeight = ($("#mid-right").css("height"));
	chai.assert.equal(midRightHeight, "600px", "Calendar div has an incorrect height value.");
	
	});
})