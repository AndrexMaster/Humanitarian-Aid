<?php
use Illuminate\Database\Eloquent\Model;

class PersonalAccessToken extends Model
{
    /**
    * Get the owning tokenable model.
    */

    public function tokenable()
    {
        return $this->morphTo();
    }
}
