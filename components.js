// ==========================================
// 全站共用頁首 (Header) 與 導航欄 (Nav)
// ==========================================
class CustomHeader extends HTMLElement {
    connectedCallback() {
        // 讀取標籤上的 page-title 屬性，若無則顯示預設文字
        const title = this.getAttribute('page-title') || '華翔興業';
        this.innerHTML = `
            <header>
                <h1>${title}</h1>
            </header>  
            <nav>
                <ul>
                    <li><a href="/">首頁</a></li>
                    <li><a href="/about">關於我們</a></li>
                    <li><a href="/products">產品介紹</a></li>
                    <li><a href="/contact">聯絡我們</a></li>
                </ul>
            </nav>
        `;
    }
}
customElements.define('custom-header', CustomHeader);

// ==========================================
// 全站共用頁尾 (Footer)
// ==========================================
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-container">
                    <div class="footer-col brand-col">
                        <div class="footer-logo">華翔興業有限公司</div>
                        <p>專業的有機顏料、溶劑染料及特種化學品供應商，致力於為客戶提供高品質的色彩解決方案。</p>
                    </div>
                    <div class="footer-col links-col">
                        <h4>快速連結</h4>
                        <ul>
                            <li><a href="/">首頁</a></li>
                            <li><a href="/about">關於我們</a></li>
                            <li><a href="/products">產品中心</a></li>
                            <li><a href="/contact">聯絡我們</a></li>
                        </ul>
                    </div>
                    <div class="footer-col contact-col">
                        <h4>聯絡資訊</h4>
                        <p><strong>地址：</strong>臺北市信義區信義路5段7號37樓</p>
                        <p><strong>電話：</strong>02-77337581</p>
                        <p><strong>Email：</strong><a href="mailto:info@hwashine.tw">info@hwashine.tw</a></p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 華翔興業有限公司 版權所有</p>
                    <div class="legal-links">
                        <a href="/privacy">隱私政策</a>
                        <a href="/terms">使用條款</a>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define('custom-footer', CustomFooter);
