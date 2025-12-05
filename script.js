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
];

// 1. Render tombol selection
if(selection){
    selection.innerHTML = peeps.map((person, index) => `
    <button id="${index}" onclick="select('${index}')" title="${person.name}"><img src="${person.profile}"></button>
    `).join("");
}

const buttons = document.querySelectorAll("#selection button");

// 2. Fungsi modifikasi wishlist
const mod = (n, act = "add") => {
    // Cari tombol di dalam section Gallery
    const wishlistBtn = document.querySelector("#sec1 .wishlist");
    
    if (act === "add") {
        if(wishlistBtn) {
            wishlistBtn.innerText = "Hapus dari wishlist";
            wishlistBtn.onclick = () => mod(n, "remove");
            wishlistBtn.style.backgroundColor = "#1F242B";
            wishlistBtn.style.color = "#2AD882";
        }
        if(!wishlist.includes(n)) wishlist.push(n);
        alert(`${peeps[n].name} ditambahkan ke wishlist!`);
    } else if (act === "remove") {
        if(wishlistBtn) {
            wishlistBtn.innerText = "Tambah ke wishlist";
            wishlistBtn.onclick = () => mod(n, "add");
            wishlistBtn.style.backgroundColor = "transparent";
        }
        const idx = wishlist.indexOf(n);
        if (idx > -1) wishlist.splice(idx, 1);
        alert(`${peeps[n].name} dihapus dari wishlist!`);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// 3. Fungsi pilih profil
const select = (id) => {
    selectedButton = document.getElementById(id);
    const n = parseInt(id);

    // Reset style button
    buttons.forEach(btn => btn.classList.remove("selected"));
    if(selectedButton) selectedButton.classList.add("selected");

    // Generate konten details
    const inside = titles.map((title, index) => `
        <figure>
            <img src="${peeps[n].img[index]}">
            <figcaption>${title}</figcaption>
            <details open>
                <summary>Klik untuk detail</summary>
                <figcaption>${peeps[n].details[index]}</figcaption>
            </details>
        </figure>
    `).join("");

    // Cek status wishlist untuk tombol
    const isWished = wishlist.includes(n);
    const btnText = isWished ? "Hapus dari wishlist" : "Tambah ke wishlist";
    const btnAction = isWished ? "remove" : "add";
    
    // Inject HTML
    container.innerHTML = `
        <section id="sec1">
            <div id="s1sq1">
                <h1>${peeps[n].name}</h1>
                <button class="wishlist" onclick="mod(${n}, '${btnAction}')">${btnText}</button>
            </div>
            <div class="insec">
                ${inside}
            </div>
        </section>
    `;

    // Scroll sedikit ke atas agar user sadar konten berubah
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Render halaman Wishlist
const isiWishlist = () => {
    if (!wishlistContainer) return;
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<h2 style='text-align:center; width:100%; color:#888;'>Wishlist anda kosong.</h2>";
        return;
    }

    wishlistContainer.innerHTML = wishlist.map(n => `
        <a href="https://www.instagram.com/${peeps[n].tag}/" target="_blank">
            <div class="s1sq2">
                <img src="${peeps[n].profile}" class="simg">
                <div class="s1sq2sub1">
                    <div class="inline">
                        <img src="instagraml.png" class="uimg" onerror="this.style.display='none'"> 
                        <h3>${peeps[n].name}</h3>
                    </div>
                    <p>@${peeps[n].tag}</p>
                </div>
            </div>
        </a>
    `).join("");
}

const clearWishlist = () => {
    if(confirm("Yakin ingin menghapus semua wishlist?")) {
        wishlist = [];
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        isiWishlist();
    }
}

// 5. Inisialisasi
if (wishlistContainer) isiWishlist();
if (wishlistButton) wishlistButton.addEventListener("click", clearWishlist);

// Auto-select profil pertama jika di halaman resume
if (selection && peeps.length > 0) {
    select('0'); 
}