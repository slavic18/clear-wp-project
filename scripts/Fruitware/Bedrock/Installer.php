<?php

namespace Fruitware\Bedrock;

use Composer\Script\Event;

class Installer {
    /**
     * Generate robots.txt if doesn't exist
     */
    public static function generateRobotsTxt(Event $event) {
        $root = dirname(dirname(dirname(__DIR__)));
        $file = $root.'/robots.txt';

        if (!file_exists($file))
        {
            $content = "User-agent: *
Disallow: /";
            $fp = fopen($root."/robots.txt", "wb");
            fwrite($fp, $content);
            fclose($fp);
        }
    }
}