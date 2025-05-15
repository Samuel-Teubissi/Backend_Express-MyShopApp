-- import to SQLite by running: sqlite3.exe db.sqlite3 -init sqlite.sql

PRAGMA ignore_check_constraints = ON;
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS `user` (
    `id_user` INTEGER PRIMARY KEY AUTOINCREMENT,
    `number`  INTEGER NOT NULL,
    `name`    TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `date`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT OR IGNORE INTO `user` (`id_user`, `number`, `name`, `password`, `date`) VALUES
(3, 658585858, 'Dubois Narcisse', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2024-10-23 13:34:41'),
(4, 659595959, 'Francko', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2024-10-23 13:34:41'),
(5, 660606060, 'Arnaud Tsamère', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2024-10-23 13:34:41'),
(6, 661616161, 'Franck Lucas', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2024-10-23 13:34:41'),
(8, 660606061, 'Zee Bg', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2025-04-01 14:36:01'),
(9, 660606057, 'ZAAZ', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2025-04-01 15:31:47'),
(10, 672737475, 'Gonzormor', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2025-04-21 21:13:15'),
(13, 666666666, 'Gnimpazor', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2025-04-29 04:04:17');

CREATE TABLE IF NOT EXISTS category (
`id_categ` INTEGER  PRIMARY KEY AUTOINCREMENT,
`content` TEXT DEFAULT NULL
);
INSERT OR IGNORE INTO category (`id_categ`, `content`) VALUES
(1, 'électronique'),
(2, 'décoration & accéssoire'),
(3, 'beauté & cosmétique'),
(4, 'enfant & jouet'),
(5, 'alimentation'),
(6, 'vêtement'),
(7, 'livre');

CREATE TABLE IF NOT EXISTS trader (
`id_trader` INTEGER PRIMARY KEY AUTOINCREMENT,
`number` INTEGER DEFAULT NULL,
`name` TEXT DEFAULT NULL,
`trader_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT OR IGNORE INTO trader (`id_trader`, `number`, `name`, `trader_date`) VALUES
(24, 659595959, 'Francko', '2024-10-29 18:01:58'),
(25, 660606060, 'Arnaud Tsamère', '2024-11-07 12:55:29'),
(26, 658585858, 'Dubois Narcisse', '2024-11-08 16:19:16'),
(33, 660606061, 'Zee Bg', '2025-04-08 13:29:49');

CREATE TABLE IF NOT EXISTS articles (
        `id_articles`     INTEGER  PRIMARY KEY AUTOINCREMENT,
        `id_trader`       INTEGER,
        `price`           INTEGER NOT NULL,
        `article`         TEXT NOT NULL,
        `quantity`        INTEGER,
        `category`        INTEGER,
        `file_name`       TEXT NOT NULL,
        `art_visible`     INTEGER DEFAULT NULL,
        `date`            TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        `date_updated`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (`id_trader`) REFERENCES trader (`id_trader`),
        FOREIGN KEY (`category`) REFERENCES category (`id_categ`)
    );

INSERT OR IGNORE INTO `articles` (`id_articles`, `id_trader`, `price`, `article`, `quantity`, `category`, `file_name`, `art_visible`, `date`, `date_updated`) VALUES
(9, 24, 11000, 'DD Ram 32go', 21, 1, 'photo_2018-12-10_01-58-366.jpg', 0, '2025-04-24 15:21:59', '2025-04-27 20:56:28'),
(10, 24, 5400, 'Carimo', 15, 3, 'boite11.jpg', 0, '2024-11-13 11:05:12', '2025-04-27 20:56:28'),
(11, 25, 250500, 'bras robotique 5', 565, 4, 'photo_2018-12-10_01-58-367.jpg', 1, '2025-04-23 23:52:32', '2025-04-29 03:45:56'),
(12, 25, 40500, 'Armure Dorée', 34, 1, 'h_dxd_31.jpg', 1, '2025-04-27 19:53:03', '2025-04-27 20:56:28'),
(13, 26, 125300, 'The Ghost Empire', 0, 7, 'boite111.jpg', 1, '2024-11-11 18:38:00', '2025-04-29 03:45:56'),
(14, 26, 1500, 'Pyrhénée', 97, 2, "1_-thumb-24X344-4462.jpg", 0, '2025-04-20 18:13:18', '2025-04-27 20:56:28'),
(15, 26, 15500, 'T-Shirt Prada', 24, 6, 'IMG-20220916-WA0002.jpg', 0, '2025-02-16 19:41:14', '2025-04-27 20:56:28'),
(16, 26, 18500, 'Plat d''Okok', 20, 5, 'IMG-20220920-WA0021.jpg', 0, '2025-04-20 20:22:21', '2025-04-27 20:56:28'),
(17, 26, 10000, 'Devnir BG', 0, 7, 'IMG-20220928-WA0053.jpg', 1, '2025-04-27 19:46:05', '2025-04-27 20:56:28'),
(19, 26, 20000, 'T shirt Bg', 49, 6, 'IMG-20220930-WA00331.jpg', 1, '2025-04-24 15:19:05', '2025-04-29 03:45:56'),
(20, 26, 11500, 'pull H-M', 5, 6, 'IMG_3104.jpg', 1, '2024-11-15 10:34:15', '2025-04-27 20:56:28'),
(21, 26, 12300, 'pull en laine', 0, 6, 'IMG-20220920-WA0005.jpg', 1, '2024-11-15 14:44:15', '2025-04-27 20:56:28'),
(22, 26, 112000, 'painture murale', 9, 2, 'IMG-20220920-WA0025.jpg', 1, '2024-11-15 14:28:15', '2025-04-29 03:45:56'),
(23, 25, 15600, 'Pack de couverts BIO', 15, 2, 'knife-fork-and-spoon-png-0000054041-800-removebg-preview.png', 0, '2025-04-18 16:50:04', '2025-04-27 20:56:28'),
(24, 25, 15300, 'PLATER', 15, 5, 'Pompi_FLYER_DATE.png', 0, '2025-02-07 21:53:45', '2025-04-27 20:56:28'),
(25, 25, 10500, 'Flyer info 4', 1, 1, 'images.jpg', 0, '2025-04-20 02:37:44', '2025-04-27 20:56:28'),
(26, 25, 21500, 'Flyer pro formation en ligne', 14, 1, "FORMATION-EN-INFOGRAPHIE-AOUT-2024-80X566-px.jpg", 1, '2025-04-24 15:15:56', '2025-04-30 00:07:57'),
(27, 25, 105500, 'Formation en programmation', 1, 4, 'images.png', 0, '2025-04-20 02:15:38', '2025-04-27 20:56:28'),
(28, 25, 185000, 'Zee bg', 34, 6, 'kocee_concert.png', 0, '2025-04-13 23:52:14', '2025-04-27 20:56:28'),
(29, 25, 2400, 'Costume Homme BG', 12, 6, 'IMG-20250402-WA0081.jpg', 1, '2025-04-20 11:01:20', '2025-04-30 00:07:57'),
(30, 25, 1000500, 'Lamborghini XR', 1, 4, 'funny_mindset_bro.png', 0, '2025-04-13 23:48:19', '2025-04-27 20:56:28'),
(31, 25, 1200, 'Fond vert', 2, 3, 'Screenshot_2025-02-04_142419.png', 0, '2025-04-13 23:56:18', '2025-04-27 20:56:28'),
(33, 25, 2800, 'teinture pour vetements', 4, 7, 'background_curved_pattern_3.jpg', 0, '2025-04-15 16:02:54', '2025-04-27 20:56:28'),
(34, 25, 500, 'composant checkbox', 1000, 4, 'checkbox_png_icon_3.png', 0, '2025-04-13 23:47:44', '2025-04-27 20:56:28'),
(36, 33, 1500, 'pommes pilées', 1, 5, 'vlcsnap-2025-01-30-17h37m47s5321.png', 0, '2025-04-21 17:41:49', '2025-04-27 20:56:28'),
(37, 25, 105000, 'test', 3, 7, 'vlcsnap-2025-02-10-15h12m15s257.png', 0, '2025-04-13 23:56:32', '2025-04-27 20:56:28'),
(38, 25, 2800, 'teinture pour vetemend', 15, 6, 'vlcsnap-2025-02-10-15h12m15s2571.png', 0, '2025-04-20 11:10:19', '2025-04-27 20:56:28'),
(39, 33, 14000, 'chaud chaud', 14, 5, 'vlcsnap-2025-01-30-17h38m01s927.png', 0, '2025-04-21 19:05:21', '2025-04-27 20:56:28'),
(40, 33, 1500, 'screen blue', 4, 1, 'vlcsnap-2025-03-06-23h00m15s014.png', 0, '2025-04-21 19:04:13', '2025-04-27 20:56:28'),
(41, 33, 250500, 'Flyer pro formation en ligne Pro', 134, 4, 'vlcsnap-2025-03-18-20h42m50s666.png', 0, '2025-04-21 18:48:29', '2025-04-27 20:56:28'),
(42, 33, 500, 'Flyer info New', 11, 2, 'IMG-20250402-WA0039.jpg', 0, '2025-04-21 18:45:27', '2025-04-29 23:42:15'),
(43, 33, 500, 'Screen programation', 14, 7, 'Screenshot_2025-02-04_1424191.png', 0, '2025-04-21 18:54:06', '2025-04-27 20:56:28'),
(44, 25, 5000, 'Flyer Kocee', 11, 1, 'kocee_concert1.png', 0, '2025-04-24 15:15:12', '2025-04-29 19:25:32');


CREATE TABLE IF NOT EXISTS db_command_cart (
    `id_command` INTEGER PRIMARY KEY AUTOINCREMENT,
    `id_user`    INTEGER DEFAULT NULL,
    `total`      INTEGER DEFAULT NULL,
    `date`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
);
INSERT OR IGNORE INTO db_command_cart (`id_command`, `id_user`, `total`, `date`) VALUES
(76, 5, 1995000, '2024-11-01 18:01:40'),
(78, 5, 105000, '2024-11-01 18:23:04'),
(79, 6, 2289100, '2024-11-08 16:54:45'),
(80, 6, 1624200, '2024-11-11 18:38:00'),
(81, 3, 3279900, '2024-11-15 14:40:15'),
(82, 6, 12300, '2024-11-15 14:44:15');

CREATE TABLE IF NOT EXISTS `content` (
    `id_content` INTEGER PRIMARY KEY AUTOINCREMENT,
    `id_command` INTEGER DEFAULT NULL,
    `id_article` INTEGER DEFAULT NULL,
    `name`      TEXT DEFAULT NULL,
    `quantity`  INTEGER DEFAULT NULL,
    `price`     INTEGER DEFAULT NULL,
    `date`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (`id_command`) REFERENCES db_command_cart (`id_command`),
    FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_articles`)
);

CREATE TABLE IF NOT EXISTS db_content_cart (
    `id_content` INTEGER PRIMARY KEY AUTOINCREMENT,
    `id_command` INTEGER DEFAULT NULL,
    `id_article` INTEGER DEFAULT NULL,
    `name`       TEXT DEFAULT NULL,
    `quantity`   INTEGER DEFAULT NULL,
    `price`      INTEGER DEFAULT NULL,
    `date`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (`id_command`) REFERENCES db_command_cart (`id_command`),
    FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_articles`)
);
INSERT OR IGNORE INTO db_content_cart (`id_content`, `id_command`, `id_article`, `name`, `quantity`, `price`, `date`) VALUES
(139, 76, 9, 'yu gi oh', 30, 52500, '2024-11-01 18:05:40'),
(140, 76, 10, 'doliprane', 8, 52500, '2024-11-01 18:07:18'),
(141, 78, 10, 'doliprane', 2, 52500, '2024-11-01 18:23:04'),
(142, 79, 15, 'T-Shirt Prada', 10, 15500, '2024-11-08 16:54:45'),
(143, 79, 17, 'Devnir BG', 1, 7800, '2024-11-08 16:54:45'),
(144, 79, 11, 'bras mécanique', 2, 1000500, '2024-11-08 16:54:45'),
(145, 79, 13, 'The Ghost Empire', 1, 125300, '2024-11-08 16:54:45'),
(146, 80, 15, 'T-Shirt Prada', 1, 15500, '2024-11-11 18:38:00'),
(147, 80, 12, 'Armure', 4, 23200, '2024-11-11 18:38:00'),
(148, 80, 13, 'The Ghost Empire', 3, 125300, '2024-11-11 18:38:01'),
(149, 80, 10, 'doliprane', 2, 52500, '2024-11-11 18:38:01'),
(150, 80, 11, 'bras mécanique', 1, 1000500, '2024-11-11 18:38:01'),
(151, 80, 14, 'Pyrhénée', 23, 1500, '2024-11-11 18:38:01'),
(152, 81, 11, 'bras mécanique', 3, 1000500, '2024-11-15 14:40:15'),
(153, 81, 12, 'Armure', 12, 23200, '2024-11-15 14:40:15'),
(154, 82, 21, 'pull en laine', 1, 12300, '2024-11-15 14:44:15');

CREATE TABLE IF NOT EXISTS db_notifications (
    `notif_id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `notif_user` TEXT DEFAULT NULL,
    `notif_message` TEXT DEFAULT NULL,
    `notif_type` TEXT DEFAULT NULL,
    `notif_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `notif_status` TEXT DEFAULT 'unread'
);
INSERT OR IGNORE INTO db_notifications (`notif_id`, `notif_user`, `notif_message`, `notif_type`, `notif_date`, `notif_status`) VALUES
(1, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-23 23:42:15', 'read'),
(7, '5', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-21 23:52:38', 'read'),
(9, '5', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-20 16:58:27', 'read'),
(10, '3', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-20 20:31:25', 'read'),
(11, '3', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-20 20:31:25', 'read'),
(12, '3', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-20 23:24:50', 'unread'),
(13, '3', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-20 23:25:20', 'unread'),
(14, '8', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-21 19:08:55', 'read'),
(15, '8', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-21 18:45:40', 'read'),
(16, '8', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-21 19:08:55', 'read'),
(17, '8', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-21 19:08:55', 'read'),
(18, '8', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-21 19:08:55', 'read'),
(19, '8', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-21 19:08:55', 'read'),
(20, '8', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-21 19:08:55', 'read'),
(21, '8', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-21 19:08:54', 'read'),
(22, 'admin', 'Un nouvel utilisateur inscrit sur la plateforme', 'addUser', '2025-04-29 18:56:45', 'read'),
(23, 'updateArticle', 'default', 'undefined', '2025-04-21 23:44:55', 'unread'),
(24, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-21 23:45:45', 'unread'),
(25, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-21 23:47:30', 'unread'),
(26, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-22 02:02:27', 'read'),
(27, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-21 23:52:01', 'unread'),
(28, '5', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-23 23:51:31', 'unread'),
(29, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-23 23:52:32', 'unread'),
(30, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-24 15:15:12', 'unread'),
(31, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-26 21:46:37', 'read'),
(32, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-24 15:16:22', 'unread'),
(33, '3', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-24 15:19:05', 'unread'),
(34, '4', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-24 15:21:59', 'unread'),
(35, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-25 01:42:25', 'unread'),
(36, '5', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-25 01:46:42', 'unread'),
(37, '3', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-27 19:46:05', 'unread'),
(38, '5', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-27 19:53:03', 'unread'),
(39, '5', 'Vous avez ajouté un nouveau produit sur la plateforme', 'addArticle', '2025-04-27 20:02:23', 'unread'),
(40, '5', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-28 15:17:46', 'unread'),
(41, 'admin', 'Un nouvel utilisateur inscrit sur la plateforme', 'addUser', '2025-04-29 04:04:17', 'unread'),
(42, '5', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-29 19:25:32', 'unread'),
(43, '8', 'Vous avez mis à jour un produit', 'updateArticle', '2025-04-29 23:39:15', 'unread'),
(44, '8', 'Vous avez supprimé un produit du site', 'deleteArticle', '2025-04-29 23:42:15', 'unread');

COMMIT;

