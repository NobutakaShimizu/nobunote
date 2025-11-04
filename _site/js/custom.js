// サイドバートグル機能
(function() {
  'use strict';

  function initSidebarToggle() {
    // サイドバーの状態を管理
    const SIDEBAR_STATE_KEY = 'sidebar-visible';
    const sidebar = document.querySelector('.side-bar');
    const main = document.querySelector('.main');
    
    if (!sidebar || !main) {
      console.warn('サイドバーまたはメインコンテンツが見つかりません');
      return;
    }

    // トグルボタンを作成
    const toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.setAttribute('aria-label', 'サイドバーを切り替え');
    toggleButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    // ボタンをbodyに追加（メインコンテンツの左上に配置）
    document.body.appendChild(toggleButton);

    // 現在のサイドバーの表示状態を取得
    function isSidebarVisible() {
      return !sidebar.classList.contains('sidebar-hidden');
    }

    // localStorageから状態を読み込む
    function getSidebarState() {
      const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
      // デフォルトは表示（md以上の場合）
      if (saved === null) {
        return window.innerWidth >= 768; // md breakpoint
      }
      return saved === 'true';
    }

    // サイドバーの表示状態を設定
    function setSidebarVisibility(visible) {
      localStorage.setItem(SIDEBAR_STATE_KEY, visible.toString());
      
      if (visible) {
        sidebar.classList.remove('sidebar-hidden');
        main.classList.remove('sidebar-hidden');
        toggleButton.classList.remove('sidebar-hidden');
      } else {
        sidebar.classList.add('sidebar-hidden');
        main.classList.add('sidebar-hidden');
        toggleButton.classList.add('sidebar-hidden');
      }
      
      // ボタンのaria-labelを更新
      toggleButton.setAttribute('aria-label', visible ? 'サイドバーを非表示' : 'サイドバーを表示');
    }

    // トグルボタンのクリックイベント
    toggleButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const currentVisible = isSidebarVisible();
      setSidebarVisibility(!currentVisible);
    });

    // 初期状態を設定（md以上の場合のみ）
    function initSidebar() {
      if (window.innerWidth >= 768) { // md breakpoint
        const isVisible = getSidebarState();
        setSidebarVisibility(isVisible);
      } else {
        // 小さい画面ではサイドバーを非表示
        setSidebarVisibility(false);
      }
    }

    // リサイズイベントで状態を更新
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 768) {
          // md以上の場合、保存された状態を復元
          const isVisible = getSidebarState();
          setSidebarVisibility(isVisible);
        } else {
          // 小さい画面では常に非表示
          setSidebarVisibility(false);
        }
      }, 250);
    });

    // 初期化
    initSidebar();
  }

  // DOMContentLoadedで実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarToggle);
  } else {
    initSidebarToggle();
  }
})();
