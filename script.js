// ローディング画面
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// モバイルメニュー
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ナビゲーションのアクティブ状態
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// モーダル機能
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCurrent = document.getElementById('modal-current');
const modalTotal = document.getElementById('modal-total');
const portfolioItems = document.querySelectorAll('.portfolio-item');

let currentImages = [];
let currentImageIndex = 0;

function openModal(images, category) {
    currentImages = images.split(',').map(img => `images/${img.trim()}`);
    currentImageIndex = 0;
    showImage(0);
    
    // カテゴリに応じてモーダルにクラスを追加
    modal.className = 'modal';
    if (category) {
        modal.classList.add(`${category}-modal`);
    }
    
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function showImage(index) {
    if (currentImages.length === 0) return;
    
    // 循環処理
    if (index < 0) {
        index = currentImages.length - 1;
    } else if (index >= currentImages.length) {
        index = 0;
    }
    
    currentImageIndex = index;
    modalImg.src = currentImages[index];
    modalCurrent.textContent = index + 1;
    
    // ナビゲーションボタンを常に有効にする
    modalPrev.disabled = false;
    modalNext.disabled = false;
}

function nextImage() {
    showImage(currentImageIndex + 1);
}

function prevImage() {
    showImage(currentImageIndex - 1);
}

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const images = item.getAttribute('data-images');
        const category = item.getAttribute('data-category');
        if (images) {
            openModal(images, category);
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
});

modalPrev.addEventListener('click', prevImage);
modalNext.addEventListener('click', nextImage);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// フォームバリデーション
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const errors = [];

    // 名前のバリデーション
    if (nameInput.value.trim().length < 2) {
        errors.push('お名前は2文字以上で入力してください');
        isValid = false;
    }

    // メールのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        errors.push('有効なメールアドレスを入力してください');
        isValid = false;
    }

    // メッセージのバリデーション
    if (messageInput.value.trim().length < 10) {
        errors.push('メッセージは10文字以上で入力してください');
        isValid = false;
    }

    if (isValid) {
        alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡いたします。');
        contactForm.reset();
    } else {
        alert('入力内容に誤りがあります：\n' + errors.join('\n'));
    }
});

// 画像の遅延読み込み（プレースホルダー）
const images = document.querySelectorAll('.portfolio-image, .profile-image, .concept-image');
images.forEach((img, index) => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
});

// ホバーエフェクトの強化
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ヘッダーのスクロール効果
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // ヘッダーを常に表示するため、スクロール効果を無効化
    header.style.transform = 'translateY(0)';
});

// プロフィール画像スライドショー
function initProfileSlideshow() {
    const slides = document.querySelectorAll('.profile-image .slide');
    let currentSlide = 0;
    
    function nextSlide() {
        // 現在のスライドを非表示
        slides[currentSlide].classList.remove('active');
        
        // 次のスライドに移動
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 新しいスライドを表示
        slides[currentSlide].classList.add('active');
    }
    
    // 5秒ごとにスライドを切り替え
    setInterval(nextSlide, 5000);
}

// コンセプトスライドショー
function initConceptSlideshow() {
    const slides = document.querySelectorAll('.concept-slideshow .slide');
    
    // スライドが見つからない場合は処理を終了
    if (slides.length === 0) {
        console.log('コンセプトスライドが見つかりません');
        return;
    }
    
    console.log('コンセプトスライド数:', slides.length);
    
    let currentSlide = 0;
    let isAnimating = false;

    function goToSlide(slideIndex) {
        if (isAnimating || slideIndex === currentSlide) return;
        
        isAnimating = true;
        
        // 現在のスライドを前のスライドとしてマーク
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        
        // 新しいスライドに移動
        currentSlide = slideIndex;
        
        // 新しいスライドを表示
        slides[currentSlide].classList.add('active');
        
        // アニメーション完了後にprevクラスを削除
        setTimeout(() => {
            slides.forEach((slide, index) => {
                if (index !== currentSlide) {
                    slide.classList.remove('prev');
                }
            });
            isAnimating = false;
        }, 1500);
        
        console.log('スライド切り替え完了:', currentSlide);
    }

    function nextSlide() {
        if (isAnimating) return;
        
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // 初期化：最初のスライドのみを表示
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.classList.remove('prev');
        console.log('スライド', index, 'のクラスをリセット');
    });
    slides[0].classList.add('active');
    console.log('最初のスライドを表示に設定');
    
    // 6秒ごとにスライド切り替え
    setInterval(nextSlide, 6000);
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initProfileSlideshow();
    initConceptSlideshow();

    // モーダル機能の初期化
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const modalImg = document.getElementById('modal-img');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    let currentImages = [];
    let currentImageIndex = 0;

    function showImage(index) {
        if (currentImages.length === 0) return;
        if (index < 0) {
            index = currentImages.length - 1;
        } else if (index >= currentImages.length) {
            index = 0;
        }
        currentImageIndex = index;
        modalImg.src = currentImages[index];
    }

    function openModal(images) {
        currentImages = images.split(',').map(img => `images/${img.trim()}`);
        currentImageIndex = 0;
        showImage(0);
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    function nextImage() {
        showImage(currentImageIndex + 1);
    }
    function prevImage() {
        showImage(currentImageIndex - 1);
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const images = item.getAttribute('data-images');
            if (images) {
                openModal(images);
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    modalPrev.addEventListener('click', prevImage);
    modalNext.addEventListener('click', nextImage);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}); 