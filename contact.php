<?php
/**
 * Created by PhpStorm.
 * User: cmcclung
 * Date: 10/12/14
 * Time: 6:34 PM
 */

define('STORE_DB', false);

$arrResponse = array(
    'success' => false,
    'messages' => array()
);

if (STORE_DB) {
    $objDb = new mysqli('enterprise.cmr1.com', 'cm_user', 'XJ77JFQ1LMGQ2EJi', 'cm');
}

if (isset($_POST)) {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        if (STORE_DB) {
            $strName = $objDb->real_escape_string($_POST['name']);
            $strEmail = $objDb->real_escape_string($_POST['email']);
            $strMessage = $objDb->real_escape_string($_POST['message']);
        } else {
            $strName = $_POST['name'];
            $strEmail = $_POST['email'];
            $strMessage = $_POST['message'];
        }

        if ($strName != '' && $strEmail != '' && $strMessage != '') {
            $strTo = 'charlie@cmr1.com';
            $strHeaders = 'From: alerts@cmr1.com' . "\r\n";
            $strMessage .= "\n\nPlease respond to: $strName <$strEmail>";

            if (@mail($strTo, 'charliemcclung.com contact!', $strMessage, $strHeaders)) {
                if ($objDb->connect_errno) {
                    $arrResponse['messages'][] = 'Error submitting contact';
                    error_log("Failed to connect to MySQL: " . $objDb->connect_errno);
                } else {
                    if (STORE_DB) {
                        if ($objDb->query("INSERT INTO contacts (name, email, message) VALUES ('$strName', '$strEmail', '$strMessage')")) {
                            $arrResponse['success'] = true;
                        } else {
                            $arrResponse['messages'][] = 'Error submitting contact';
                        }
                    } else {
                        $arrResponse['success'] = true;
                    }
                }

            } else {
                $arrResponse['messages'][] = 'Unable to send message';
            }
        } else {
            $arrResponse['messages'][] = 'Field(s) cannot be empty';
        }
    } else {
        $arrResponse['messages'][] = 'All fields are required';
    }
} else {
    $arrResponse['messages'][] = 'Invalid access';
}

echo json_encode($arrResponse);