<?php

namespace App\Traits;

trait ConditionallyVerifiesEmail
{
    public function shouldVerifyEmail()
    {
        return !$this->is_oauth_user;
    }

    public function hasVerifiedEmail()
    {
        if (!$this->shouldVerifyEmail()) {
            return true;
        }
        return parent::hasVerifiedEmail();
    }

    public function markEmailAsVerified()
    {
        if (!$this->shouldVerifyEmail()) {
            return true;
        }
        return parent::markEmailAsVerified();
    }
}