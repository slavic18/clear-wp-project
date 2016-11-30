<?php
function exampleProcessFormFunc()
{
    if (isset($_SERVER['REQUEST_METHOD']) && ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['form_type']) && $_POST['form_type'] == 'notify_on_available')) {
        try {

            volta_errors()->add('login_success', __('We will notify you when this product will be in stock', 'volta'));

        } catch (Exception $e) {
            volta_errors()->add('notify_on_available_errors', __($e->getMessage(), 'volta'));
        }
    }
}
add_action('init', 'notifyOnAvailable', 1);

// used for tracking error messages
function volta_errors()
{
    static $wp_error; // Will hold global variable safely
    return isset($wp_error) ? $wp_error : ($wp_error = new WP_Error(null, null, null));
}

// displays error messages from form submissions
function volta_show_error_messages($type = false)
{
    if ($codes = volta_errors()->get_error_codes()) {
        echo '<div class="error-block">';
        // Loop error codes and display errors
        foreach ($codes as $code) {
            if ($type && $type == $code) {
                $message = volta_errors()->get_error_message($code);
                echo '<span class="error">' . $message . '</span><br/>';
            }
        }
        echo '</div>';
    }
}
