let flag = true;
//その他データ
let left = document.getElementById("left");
let right = document.getElementById("right");

//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = new Array(99);
for (let i = 0; i < 99; i++) {
  plyExpNeed[i] = i ** 2 * 3 + 10;
}
let plyarr = [
  document.getElementById("plyImg"), //src 0
  document.getElementById("plySt0"), //name 1
  document.getElementById("plySt1"), //level 2
  document.getElementById("plySt2"), //hp 3
  document.getElementById("plySt3"), //att 4
  document.getElementById("plySt4"), //rec 5
  document.getElementById("plySt5"), //exp 6
  document.getElementById("plySt6"), //nextexp 7
];
plyarr[1].textContent = prompt("プレイヤー名を入力");

//プレイヤー回復
plyarr[0].addEventListener("mousedown", () => {
  if (flag) {
    plyarr[0].src = "img/playerC.png";
  }
});
plyarr[0].addEventListener("mouseup", () => {
  if (flag) {
    plyarr[0].src = "img/playerA.png";
    if (plyHp < plyHpMax) {
      plyHp += plyHeal;
      plyarr[3].textContent = "HP:" + plyHp;
      if (plyHp + plyHeal > plyHpMax) {
        plyarr[3].textContent = "HP:" + plyHpMax;
      }
    }
  }
});
//敵データ
let enenum = 0;
let ene = new Array(10);

for (let i = 0; i < 10; i++) {
  ene[i] = new Object();
  ene[i].level = 1 + 2 * i;
  ene[i].hpMax = 10 + 3 * i ** 3;
  ene[i].hp = ene[i].hpMax;
  ene[i].att = 2 + 2 * i ** 2;
  ene[i].exp = 5 + 15 * i;
  ene[i].kill = 0;
  ene[i].cntMax = 4 - Math.floor(i * 0.24);
  ene[i].cnt = ene[i].cntMax;
}
ene[9].hpMax = 8000;
ene[9].hp = ene[9].hpMax;
ene[0].name = "スライム";
ene[1].name = "バット";
ene[2].name = "ラット";
ene[3].name = "スネーク";
ene[4].name = "ドッグ";
ene[5].name = "コリン";
ene[6].name = "ゴースト";
ene[7].name = "ゴブリン";
ene[8].name = "ファイアボール";
ene[9].name = "ボス:ベアー";
enearr = [
  document.getElementById("eneImg"), //src 0
  document.getElementById("eneSt0"), //name 1
  document.getElementById("eneSt1"), //level 2
  document.getElementById("eneSt2"), //hp 3
  document.getElementById("eneSt3"), //att 4
  document.getElementById("eneSt4"), //kill 5
  document.getElementById("eneSec"), //sec 6
];

//敵を攻撃
enearr[0].addEventListener("mousedown", () => {
  if (flag) {
    enearr[0].src = "img/enemyB" + enenum + ".png";
  }
});
enearr[0].addEventListener("mouseup", () => {
  if (flag) {
    enearr[0].src = "img/enemyA" + enenum + ".png";
    if (ene[enenum].hp - plyAtt > 0) {
      ene[enenum].hp -= plyAtt;
      console.log(ene[enenum].hp);
      enearr[3].textContent = "HP:" + ene[enenum].hp;
    } else {
      ene[enenum].hp = ene[enenum].hpMax;
      ene[enenum].kill++;
      enearr[5].textContent = "倒した回数：" + ene[enenum].kill;
      enearr[3].textContent = "HP:" + ene[enenum].hp;
      //ゲームクリア処理
      if (ene[9].kill >= 1) {
        clearInterval(loop);
        flag = false;
        plyarr[0].src = "img/playerA.png";
        enearr[0].src = "img/enemyB" + enenum + ".png";
        enearr[6].textContent = "ゲームクリア！！！！！！！";
      }
      //経験値の処理
      plyExp += ene[enenum].exp;
      plyarr[6].textContent = "経験値:" + plyExp;
      plyExpNext -= ene[enenum].exp;
      plyarr[7].textContent =
        "次のレベルまでの経験値" + plyExpNext + "ポイント";
      //レベルアップの処理
      if (plyExpNext <= 0) {
        plyLv++;
        plyExpNext = plyExpNeed[plyLv];
        plySt1.textContent = "レベル：" + plyLv;
        plyHpMax = plyLv ** 2 + 6;
        plyHp = plyHpMax;
        plySt2.textContent = "HP:" + plyHp;
        plyAtt += plyLv * 2 - 3;
        plySt3.textContent = "攻撃力：" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法：" + plyHeal;
      }
      plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    ene[3].textContent = "HP：" + ene[enenum].hp;
  }
});
//敵が時間ごとに攻撃
let loop = setInterval(() => {
  if (ene[enenum].cnt > 0) {
    ene[enenum].cnt--;
    enearr[6].textContent = "モンスターの攻撃まで" + ene[enenum].cnt + "秒";
  } else {
    ene[enenum].cnt = ene[enenum].cntMax;
    plyarr[0].src = "img/playerB.png";
    plyHp -= ene[enenum].att;
    if (plyHp > 0) {
      plyarr[3].textContent = "HP:" + plyHp;
      enearr[6].textContent = "モンスターの攻撃まで" + ene[enenum].cnt + "秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plyarr[3].textContent = "HP:" + plyHp;
      enearr[6].textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        ene[enenum].cnt = ene[enenum].cntMax;
        plyarr[0].src = "img/playerA.png";
        enearr[6].textContent = "モンスターの攻撃まで" + ene[enenum].cnt + "秒";
      }
    }, 500);
  }
}, 1000);
// 次のモンスター を押したときの処理

right.addEventListener("click", () => {
  if (flag) {
    if (enenum < 9) {
      enenum++;
      enearr[0].src = "img/enemyA" + enenum + ".png";
      enearr[1].textContent = ene[enenum].name;
      enearr[2].textContent = "レベル:" + ene[enenum].level;
      enearr[3].textContent = "HP:" + ene[enenum].hp;
      enearr[4].textContent = "攻撃力:" + ene[enenum].att;
      enearr[5].textContent = "倒した回数:" + ene[enenum].kill;
      enearr[6].textContent = "モンスターの攻撃まで" + ene[enenum].cnt;
    }
  }
});

// 逃げる を押したときの処理

left.addEventListener("click", () => {
  if (flag) {
    if (enenum > 0) {
      enenum--;
      enearr[0].src = "img/enemyA" + enenum + ".png";
      enearr[1].textContent = ene[enenum].name;
      enearr[2].textContent = "レベル:" + ene[enenum].level;
      enearr[3].textContent = "HP:" + ene[enenum].hp;
      enearr[4].textContent = "攻撃力:" + ene[enenum].att;
      enearr[5].textContent = "倒した回数:" + ene[enenum].kill;
      enearr[6].textContent = "モンスターの攻撃まで" + ene[enenum].cnt;
    }
  }
});
//ゲームクリア処理
if (ene[9].kill >= 1) {
  clearInterval(loop);
  flag = false;
  plyarr[0].src = "img/playerA.png";
  enearr[0].src = "img/enemyB" + enenum + ".png";
  enearr[6].textContent = "ゲームクリア！！！！！！！";
}
