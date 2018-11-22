window.onload = function() {
    
}

$(function(){
    /* Layout */
    var itemWidth = $(".card_list li:nth-child(1)").width();
    var x2Length = itemWidth * 2;
    
    $("li").height(itemWidth).css('top',itemWidth);
    $("li.x2w").width(x2Length);
    $("li.x2h").height(x2Length);
    
    $('.card_list').masonry({
        itemSelector: 'li',
        columnWidth: function( containerWidth ) {
            return containerWidth /4;// depends how many boxes per row
        }(), // () to execute the anonymous function right away and use its result
        isAnimated: false
    });

    $(window).resize(function() {
        var itemWidth = $(".card_list li:nth-child(1)").width();
        var x2Length = itemWidth * 2;
        $("li.x2w").width(x2Length);
    });
    
    
    /* Logic */
    //랜덤함수
    function makeRandom(min, max) {
        var RandVal = Math.random() * (max - min) + min;
        return Math.floor(RandVal);
    }

    function shuffle(d) {
        for(var c = d.length - 1; c > 0; c--) {
            var b = Math.floor(Math.random() * (c + 1));
            var a = d[c]; d[c] = d[b]; d[b] = a;
        }
        return d
    }


    //아이템 넘버링
    var allItem = $(".card_list li").length;
    for(i = 0; i < allItem; i++) {
        var num = i + 1;
        $(".card_list li").eq(i).children(".inbx").children(".item").append( 
            "<span class='name'>" + num + "</span>"
        );
    }

    //멤버 배열 만들기
    var memberList = ['김건일', '김성섭', '김동혁', '임상문'];
    var memberCount = memberList.length;
    //console.log(mixMember);

    //판때기 후보군 색출
    $(".btn_shuffle").click(function() {
        $(".card_list li").removeClass("is_looser");    //class reset
        var count = $(".card_list li").length;
        for(i = 0; i < count; i++) {
            //var mixMember = shuffle(memberList)[0];   //배열 섞기
            var mixMember = memberList[makeRandom(0, memberCount)]; //배열을 랜덤으로 뽑기
            
            //이미지 매핑
            var bg = '';
            switch(mixMember) {
                case '김건일':
                    bg = 'imgs/kgi.png';    break;
                case '김성섭':
                    bg = 'imgs/kss.jpg';    break;
                case '김동혁':
                    bg = 'imgs/kdh.jpg';    break;
                case '임상문':
                    bg = 'imgs/lsm.jpg';    break;
                default:
                    bg = 'imgs/default_user.png';
            }

            //이미지 css경로 만들기
            bg = 'url(' + bg + ')';
            //console.log(i + ' : ' + mixMember + ' : ' + bg);    //확인용 로그
            
            //$(".card_list li").eq(i).children(".inbx").children(".item").text(mixMember);             //멤버 이름으로 나오게 하기
            $(".card_list li").eq(i).children(".inbx").children(".item").css('background-image', bg);   //멤버 사진으로 나오게 하기
        }
    })

    $(".btn_start").click(function() {
        var count = 100;
        var intarval = 50;
        var timer = setInterval(function() {
            //count++;
            
            console.log(count);
            var pickLooser = makeRandom(1, 26) % 13;
            $(".card_list li").removeClass("is_looser");
            $(".card_list li").eq(pickLooser).addClass("is_looser");
            
            if(count <= 0) {
                clearInterval(timer);
            } else {
                count--;
                intarval += 50;
            }
        }, intarval);
    })
});