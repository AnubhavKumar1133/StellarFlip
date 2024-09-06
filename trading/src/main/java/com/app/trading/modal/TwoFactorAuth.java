package com.app.trading.modal;

import com.app.trading.domain.VerificationType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
public class TwoFactorAuth implements Serializable {
    private boolean isEnabled = false;

    private VerificationType sendTo;
}
