#define F_CPU 16000000UL // Clock frequency, needed to delay functions
#include <avr/io.h> // Register definitions
#include <util/delay.h> // Delay functions
int main(){
    DDRB |= (1<<PB5); 
    while(1){ 
        PORTB |= (1<<PB5);
        _delay_ms(1000);
        PORTB &= ~(1<<PB5);
        _delay_ms(1000);
    }
    return 0;
}
                                