const container = document.querySelector(".container");
const wishlistContainer = document.getElementById("container2");
const selection = document.getElementById("selection");
const wishlistButton = document.querySelector("button.wishlist");

let selectedButton = null;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const titles = ["Bakat Keseharian", "Minat Akademik", "Pengalaman Organisasi"];

const peeps = [
    {
        name: "Alvin",
        longName: "Alvin Christopher Chow",
        img: ["Alvindaily.jpeg", "mesin.jpeg", "Alvinorg.jpeg"],
        details: [
            "Saya senang bermain badminton sebagai aktivitas rutin saya.",
            "Saya memiliki ketertarikan dalam bidang Teknik Mesin.",
            "Saya berpengalaman sebagai anggota OSIS di SMP IPEKA Bekasi."
        ],
        tag: "alvinchoww",
        profile: "Alvinktp.jpeg"
    },
    {
        name: "Refa",
        longName: "Rephael Geovan Nayaka",
        img: ["Refadaily.jpeg", "elektro.png", "Refaorg.jpg"],
        details: [
            "Saya menyukai olahraga badminton dan sering mengikutinya secara aktif.",
            "Saya memiliki minat mendalam dalam bidang Teknik Elektro.",
            "Saya terlibat sebagai Wakil Ketua Umum CANVAs."
        ],
        tag: "rephaelgeovan",
        profile: "Refaktp.jpeg"
    },
    {
        name: "Kenzie",
        longName: "Kenzie Clevino Lieka",
        img: ["Kenziedaily.jpeg", "Kenzieakad.jpeg", "Kenzieorg.jpeg"],
        details: [
            "Saya suka beristirahat dan tidur untuk mengembalikan energi.",
            "Saya tertarik mempelajari Teknik Elektro.",
            "Saya memiliki pengalaman sebagai anggota Humas Media di Kolese Kanisius."
        ],
        tag: "kenzieclevino",
        profile: "Kenziektp.jpeg"
    },
    {
        name: "Raka",
        longName: "Albertus Raka Bryano Putra",
        img: ["Rakadaily.jpeg", "elektro.png", "Rakaorg.jpeg"],
        details: [
            "Saya hobi memancing dan menikmati waktu di alam terbuka.",
            "Saya berminat melanjutkan studi dalam bidang Teknik Elektro.",
            "Saya aktif dalam pelayanan gereja sebagai anggota Misdinar."
        ],
        tag: "albertus.raka",
        profile: "Rakaktp.jpeg"
    },
    {
        name: "Erland",
        longName: "Johanes Erland Chandra",
        img: ["Erlanddaily.jpeg", "Erlandakad.jpg", "Erlandorg.jpeg"],
        details: [
            "Saya suka bermain badminton untuk menjaga kebugaran.",
            "Saya menyukai mata pelajaran Matematika dan ingin menguasainya lebih dalam.",
            "Saya aktif dalam kegiatan gereja sebagai Misdinar."
        ],
        tag: "joerlandsenn",
        profile: "Erlandktp.jpeg"
    },
    {
        name: "Marty",
        longName: "Marty Saigon Siregar",
        img: ["Martydaily.jpeg", "mesin.jpeg", "Martyorg.jpeg"],
        details: [
            "Saya suka bermain game di waktu luang sebagai hiburan pribadi.",
            "Saya tertarik mempelajari bidang Teknik Mesin.",
            "Saya memiliki pengalaman dalam dunia musik sebagai anggota orkestra."
        ],
        tag: "m4rty_sns",
        profile: "Martyktp.jpeg"
    }
]; //data anggota kelompok

if(selection){selection.innerHTML = peeps.map((person, index) => `
    <button id="${index}" onclick="select('${index}')" class="shrinkhide"><img src="${person.profile}">
    `).join("");}

const buttons = document.querySelectorAll("#selection button");

const mod = (n, act = "add") => {
    const wishlistaddremove = document.querySelector(".wishlist");
    if (act === "add") {
        wishlistaddremove.innerText = "Hilangkan dari  wishlist";
        wishlistaddremove.onclick = () => mod(n, "remove");
        wishlist.push(n);
        alert(`${peeps[n].name} added to wishlist!`);
    } else if (act === "remove") {
        wishlistaddremove.innerText = "Tambahkan ke wishlist";
        wishlistaddremove.onclick = () => mod(n, "add");
        wishlist.splice(wishlist.indexOf(n), 1);
        alert(`${peeps[n].name} removed from wishlist!`);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    console.log("Wishlist:", wishlist);
} //function buat update wishlist

console.log(buttons);

const select = (id) => {
    selectedButton = document.getElementById(id);
    const n = parseInt(id);

    buttons.forEach(btn => btn.classList.remove("selected"));
    selectedButton.classList.add("selected");

    const inside = titles.map((title, index) => `<figure>
	  				<img src="${peeps[n].img[index]}">
	  				<figcaption>${title}</figcaption>
	  				<details open>
	  					<figcaption>${peeps[n].details[index]}</figcaption>
	  				</details>
	  			</figure>`).join("");

    container.innerHTML = `<section id="sec1">
  			<div id="s1sq1">
  				<h1>${peeps[n].name}</h1>
  				<div id="s1sq1l"></div>
				<button class="wishlist" onclick="mod(${n}, '${wishlist.includes(n) ? 'remove' : 'add'}')">${wishlist.includes(n) ? 'Hilangkan dari wishlist' : 'Tambahkan ke wishlist'}</button>
  			</div>
  			<div class="insec">
	  			${inside}
  			</div>
  		</section>`
} //function buat nampilin isi resume anggota

const sidebarAction = (action) => {
    if (action === "expand") {
        selection.classList.remove("collapsed");
        selection.classList.add("expanded");
        buttons.forEach(btn => {
            btn.style.display = "block";
        });
        selection.style.height = "95vh";

    } else if (action === "collapse" && selectedButton) {
        selection.classList.remove("expanded");
        selection.classList.add("collapsed");
        selection.style.height = "20vh";
    }
} //function buat sidebar expand/collapse

const isiWishlist = wishlist.map(n => `
            <a href="https://www.instagram.com/${peeps[n].tag}/">
		  			<div class="s1sq2">
		  				<img src="${peeps[n].profile}" class="simg">
		  				<div class="s1sq2sub1">
		  					<div class="inline">
		  						<img src="instagraml.png" class="uimg">
		  						<h3>${peeps[n].longName}</h3>
		  					</div>
		  					<p>@${peeps[n].tag}</p>
		  				</div>
		  			</div>
		  		</a>
    `).join("");
//isi halaman wishlist

const clearWishlist = () => {
    wishlist = [];
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    wishlistContainer.innerHTML = "<h2>Your wishlist is empty!</h2>";
} //function buat clear wishlist

//Event listener dan  initial rendering
if (selection) {
    selection.addEventListener("mouseenter", () => sidebarAction("expand"));
    selection.addEventListener("mouseleave", () => sidebarAction("collapse"));
}
if (wishlistContainer) {
    if (wishlist.length > 0) {
        wishlistContainer.innerHTML = isiWishlist;
    } else {
        wishlistContainer.innerHTML = "<h2>Your wishlist is empty!</h2>";
    }
}
if(wishlistButton){
    wishlistButton.addEventListener("click", clearWishlist);
}