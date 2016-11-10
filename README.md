# SFWR ENG 4HC3 Assignment 2 - Parking Meter Documentation
Maintained by:

[Gabriel Dalimonte](https://github.com/Mornix)

[Dom DiPasquale](https://github.com/DiPasquale5)

[Mustafa Haddara](https://github.com/MustafaHaddara)

[TJ Walker](https://github.com/TheRealDetweiler)

## Instructions

### Recommended device:
A computer with a recent version of: Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari.
A screen size > 1280x720


The interface is available [here](https://mustafahaddara.github.io/ParkThing/)
(note: due to details in github’s hosting structure, this URL is case-sensitive)
If part of the screen is cut off, on Windows you may enter fullscreen in the browser by pressing the F11 key. If the UI is loaded on a device with a viewport larger than 1280x720 (in both directions), the UI will resize to fill the available space.

Source code available in this repository.

### Notes on Instructions and Assumptions
 * The blue portion of the loaded UI (along the bottom and right edges) are stand-ins for a physical case. This allows for interactions such as “inserting coins”, “card swiping”, “grabbing new tickets” and “inserting existing tickets”.
 * The prepaid accounts for the prepaid additional feature are expected to be set up online; the machines themselves are not equipped for registering new users.
 * Additionally users who have a prepaid account can only add money to the account online as the machines are not equipped to add funds.
 * The printed tickets from the prepaid section have a maximum time equal to either the amount of funds the account has or the maximum time allowed by the parking zone.
 * There are back and cancel buttons on each page allowing users to modify time and cost before confirming the printing of the ticket.
 * The coin slot and card slot are only interactive when prompted on screen. And their interaction method is clicking on the inner box (simulating inserting a coin or swiping/inserting a card into the given slot.)
 * All printed tickets appear along the bottom edge of the screen. The interaction method is clicking on the ticket, but is context sensitive depending on the state. If the ticket was just printed, it is to retrieve the ticket from the printer. Whereas when Closing Existing Ticket, clicking the ticket performs the action of inserting it into the machine. 
 * Credit card entry merely requires entering the card number, any additional security such as pin entry and account would be performed on the physical POS device in place of where the card slot is. This was not implemented for the assignment as that is not part of the touch user interface present for the actual function of the parking meter.
 * Tickets submitted for refund are always generated in the future. While all are in the future, if the tester waits for time to elapse, the user interface will correctly tell them they don’t qualify for a refund. We did not explicitly implement this as all it is is modified text.

### Paying by Cash
1. Select the green “Begin New Ticket” button to start a new ticket.
1. Depending on whether you want to add or remove time, you have the option to select either the blue “+30 min” button to add 30 minutes to your ticket or the blue “-30 min” button to remove 30 minutes to your ticket.
   * Option: Select the red “Cancel” button to initiate canceling your current ticket.
     * Option: Select the green “No, Stay” button to return to current ticket.
     * Option: Select the red “Yes, Go Back” button to confirm cancellation.
1. Select the green “Pay Now” button to confirm the desired amount of time selected to pay.
1. Select the green “Cash” button to pay via cash.
   * Option: Select the red “Back” button to return to the previous page.
1. Select the physical “Coin Slot” button to insert quarters until remaining debt is paid off.
   * Excess payment is returned to you after exceeding the value of the remaining debt [use headphones/speakers]
   * Returned change is returned in increments of $0.05, since Canada discontinued the $0.01 coin (the penny)
1. Retrieve the physical “Printed Ticket” button to receive your dashboard ticket.

### Paying by Credit Card Number/Credit Card/Debit Card
1. Select the green “Begin New Ticket” button to start a new ticket.
1. Depending on whether you want to add or remove time, you have the option to select either the blue “+30 min” button to add 30 minutes to your ticket or the blue “-30 min” button to remove 30 minutes to your ticket.
   * Option: Select the red “Cancel” button to initiate canceling your current ticket.
      * Option: Select the green “No, Stay” button to return to current ticket.
      * Option: Select the red “Yes, Go Back” button to confirm cancellation.
1. Select the green “Pay Now” button to confirm the desired amount of time selected to pay.
1. Select the green “Debit/Credit Card” button to pay via debit/credit card.
   *  Option: Select the red “Back” button to return to the previous page.
1. Option: Paying via credit card without the physical card.
   * Option: Select the red “Back” button to return to the previous page.
   * Select each number button, in the correct order, of our test bank account number: 6555123456789012
     * Option: Select the “<” button to remove the most recent digit entered.
   * Select the “Process” button to confirm the selected credit card number.
   * Retrieve the physical “Printed Ticket” button to receive your dashboard ticket.
1. Option: Paying via debit/credit card with the physical card
   * Option: Select the red “Back” button to return to the previous page.
   * Click the physical “Card Terminal” button to “swipe” your debit/credit card.
   * Retrieve the physical “Printed Ticket” button to receive your dashboard ticket.

### Additional Feature: Paying by Prepaid Ticket (PT) Account
1. Select the blue “Start Prepaid Ticket” button to attempt to access your account.
1. Option: Authenticating via virtual PT Number 
   * Option: Select the red “Cancel” button to return to the previous page.
   * Select each number button, in the correct order, of our test PT account number: 5556667771
     * Option: Select the “<” button to remove the most recent number selected.
   * Select the green “Print Ticket” button to confirm activation of your prepaid ticket.
   * Retrieve the physical “Printed Ticket” button to receive your dashboard ticket.
1. Option: Authenticating via physical PT Card
   * Option: Select the red “Cancel” button to return to the previous page.
   * Click the physical “Card Terminal” button to “swipe” your PT card and authenticate your account.

### Close Existing Ticket
1. Select the blue “Close Existing Ticket” button to refund a non-expired ticket.
1. Option: Select the red “Cancel” button to return to the previous page.
1. Option: Click the physical “Printed Ticket” button to “insert” your ticket into the interface.
   * Closing existing tickets paid via cash/debit/credit will result in excess time being returned in the method which was used to pay. [use headphones/speakers]
   * Closing existing tickets paid via PT accounts will refund the user any unused time from their current ticket.
   * ***In order for us to implement simple test cases, we suggest that you test this functionality immediately after you have created a new ticket via one of our two options. We have a random ticket generated each time you enter the Refund screen to simulate different users using it with various times remaining. For example, if you just paid for a ticket via “Begin New Ticket”, “Close Existing Ticket” will refund you the difference, while if you just authenticated your PT account, “Close Existing Ticket” will deactivate it and return the price difference back to your account ***

## Concept and State Flow Diagram
(todo)

## Design Choices

Aside from adhering to the Norman Design Principles, much thought has been placed into accommodating some types of users who require additional accessibility. Particularly, groups of users who are colour blind, users who are non-native English speakers, and users with lower dexterity.

### Color Blindness
The time selection screen under “Begin New Ticket” provides the full range of colours used. As such, some screenshots simulating different types of colorblindness are included below.

Normal
(screenshot coming soon)

Protanopia
(screenshot coming soon)

Tritanopia
(screenshot coming soon)

Achromatopsia
(screenshot coming soon)

Colour in general plays a large role in the design of the interface. Their major use is on buttons which acts as a general signifier for the “desirability” and “forwardness” of the action. By this we mean, on the “Normal” screenshot, green is desirable, it will “forward” the user towards their goal of printing a ticket. Red is regressive, it indicates an action that opposes the green, similar to that of a traffic light with stop versus go.
We succeed at our goal of using the general colours to indicate actions for people not affected by colour-blindness and those affected by Tritanopia color-blindness. The colours show contrast, and intent among the screens. 
The Protanopia simulation provides an interesting difference. Despite “Pay Now” being a yellow colour, it still satisfies the same objective as the green did. It is the most vibrant and unique colour on the page drawing user attention to it. “Cancel” has been de-emphasized by the deficiency leaving it closest to the background be still noticeable as different from the blue button. While “Cancel’s” colour does not indicate the absolute regressiveness, the less prominent colour (among all buttons) still conveys the option as the most uninteresting. 
The most difficult colorblind mode to handle is Achromatopsia, which provides a near grayscale version of the interface. We settled on the lightness of the colors used in the Normal interface by trying to balance the visual contrast and appealing colours with shades that could be distinguishable to users with Achromatopsia. We succeeded with green shade as it is the most noticeable, along with the gray disabled buttons in the Normal interface, to users. Unfortunately, users of this colorblindness must combine the button colors with additional signifiers to determine the “quality” of the buttons. 

### Non-English Speakers
We have worked to make the interface as intuitive as possible for non-English users. We’ve provided many signifiers in the initial state and remain consistent throughout to guide users through the system. The initial screen provides three buttons. They are arranged in a vertical line. The “Start New Ticket” option is larger to indicate its role for non-English speakers. It being the first option in the list does assist for users who are reading the list that it must be important since it is ordered first in the list. Finally the colour aids in discerning that tapping that button is a good choice. The green button providing forward progress is a consistent throughout the design. The consistency is the largest, green button is an ideal choice to move the user forward in the process. Blue buttons typically denote intra-screen state modification (such as time increase, decrease, as well as key entry), except on the initial screen where it indicates desirable, but non-primary actions as the primary action is “Start New Ticket” for inexperienced users. All blue buttons under the “Start New Ticket” flow contains numbers, the time selection screen includes words, but their purpose may be discerned by the prefixed +/- or pattern matching “30min” to that of the rate in the top right hand corner.

### Low Dexterity/Motor Function Required
All the buttons on the screen are large with many being near an edge. This is to help reduce occlusion, but also to assist users with lower dexterity in using the device (although these users are likely not the driver, they may be requested by the driver to retrieve a parking ticket). The large buttons allow this group of users to more easily touch the buttons as they do not require a lot of precision. Many buttons are near the edges of the physical screen facilitate these users to rest, or anchor,  their hands on the physical exterior which may assist in steadying tremors and shaking. Finally, destructive regressive actions, such as touching “Back” after entering some digits on a screen with a keypad, prompts the user if they would like to proceed with this destructive action. This is to reduce frustration where this group of users may have spent time navigating a keypad and an inaccurate touch resulted in this regressive button being accidentally pressed.

### Norman Principles Discussion
* Affordances 
  * Simple
  * All button presses
  * Purchase Ticket
    * Cash Payment
    * Card Payment
    * Select Time
  * Refund Ticket
    * Price Difference Refund
  * Prepaid Ticket
    * Automated account withdrawal
* Discoverability
  * All actions are discoverable. Each screen provides all options possible on it.
  * Keypad entry box is discoverable as it is an empty box in the initial state. The only such non-button element on a given screen
* Feedback
  * Buttons provide immediate animations when pressed
  * Attempting to perform a regressive action after making progress in the current screen will provide feedback asking for confirmation
  * Incorrect/invalid inputs on keypads will provide feedback with guidance on how to resolve the issue as well as playing an animation signal its presence.
  * Keypad button presses have feedback in the form of the field updating as the buttons are pressed.
  * Delay in removing the ticket provides audio feedback to remind the user that they have not taken the ticket in the event they forgot and started walking away from the machine.
* Signifers
  * Buttons are signified with their rounded edges
  * Buttons have drop-shadows to indicate they are buttons
  * The colour of the buttons signify the importance of the button or its general purpose (regardless of text).
  * Button size indicates the importance of the action on the current screen. 
  * Malleable fields on a screen are signified by a black border.
  * Physical interactions signified with text indicating possible physical interaction.
* Mappings
  * Keypad mapping familiar to those of debit machines, phones and others.
  * Linear mapping between rate and time.
  * red/green for good/bad
  * Red on left to map to previous, green on right to map to next page.
* Conceptual Model
  * Accounts are preloaded and billed in full initially and refunded unused time when closing a ticket
* Constraint
  * Users are restricted to only performing valid actions
  * Keypad entry fields are constrained to maximum digits of a credit card (16) and PT card (10)

### Arm and Finger Occlusion
Inputs, such as buttons and numpads, are located below their respective value displays. This is intended to prevent the user’s arms or hands from occluding their view of the data they are currently entering. Additionally, the large buttons, combined with the empty space between them, allow users to touch a given button without worrying they may be touching a different one.

### Fail Safe Rather than Fail Deadly 
The confirmation dialog when performing valid actions provides a difficult button colour designation. The regressive action is appropriately coloured red which is consistent. The button to return to the current state is green. Although not explicitly “forward” in the same sense as the other options. It makes sense as it direct the user to the more “forward” option. Additionally we’ve provided the signifier that green is good. Once users are accustomed to the system they will zip through looking for the green button. In this case the green option is the safe option. We’d rather users be a little frustrated that they didn’t exit the current screen because they were following the green buttons than users accidentally invoking the back action and automatically tapping green assuming it will ‘be good’ and return them to where they were. It’s the old “Fail Safe, Not Deadly.”

### Consistency
The consistency in the parking meter is evident through the button design, colour scheme and menu layout . In each state as the user progresses through the menu’s green always mean go forward or good and red is destructive. The buttons designs are also consistent as they all have the exact same visual look and colour scheme in each state. The same template was used for each of them. Screens which contain no malleable data are laid out vertically with buttons taking up a large portion of the screen. Whereas states with malleable data have buttons laid out along the bottom portion with two on a row. Malleable data fields are always at the top of the respective screens. Keypads are consistent with physical keypads on POS devices. Additionally it's easy to find the cancel and terminate buttons as they are all consistently located on the bottom  section of the screen. The layout of all the buttons is also consistent with the forward action buttons being higher on each page which contains no malleable state. On screens with malleable state, the forward action is always on the bottom right. 

### Additional Feature Design Decisions
The idea of the additional feature is to be similar to that of Metrolinx’s PRESTO card system. Users create accounts on a website and set up funds. The idea is that these users are experienced with the system and interact with it regularly. As such, they want to accelerate through the process of acquiring a ticket. The Prepaid Ticket option is a simple swipe (or number entry) to access their account. This streamlines the process of acquiring a ticket to a single screen. The tickets are printed with maximum time as the system supports a “Refund” option which refunds unused time. The design of the prepaid ticket screen is very similar to that of card entry screen from the “Begin New Ticket” flow. This is for consistency, but also familiarity. The current account balance is shown when the user prints a ticket so they have feedback on the status of their account and remaining funds. The objective of this feature are to be as fast as possible, reduce options, and provide an account summary during ticket printing. 

### Miscellaneous Design Decisions
The layout of the initial screen with the “Begin New Ticket” options and such as are laid out intentionally. As mentioned the first button’s purpose and layout have been explained elsewhere, but more generally, it’s highlighted, larger, and first to signify importance. The other two buttons are the same size to provide visual balance. The color is the same to highlight the primary button more rather than having three separate colours which would seem random at that point. The “Refund” button is next as a user who would like to get a refund for unused time have returned to the machine and know the option exists, but isn’t the primary feature. Being between “Begin New Ticket” and “Start Prepaid Ticket”, also provides a shared action between those flows of generating a ticket. Finally, the “Start Prepaid Ticket” option is last on the list as it requires an account, and prior knowledge of the system to actually use. It’s for power users who know it is there and are familiar with the system. Users who use the feature know it is there and what it does and do not need it to be prominent. And for users who need the signifier to navigate the interface are probably inexperienced and using the machine for the first time. They need to emphasis on the green, there is nothing a first time user can do with “Start Prepaid Ticket”. 

Red buttons on the bottom left and green on bottom right (of malleable screens) is because for English speakers (and many other languages), it reads like a book, red on the left is closer to “the previous page” of a book, whereas the green option on the right is closer to where you would grab to proceed to the next page, uncharted territory. For non-malleable screens, green is first, as it is read like a list, where the first options can be thought of as more important than lower ones. This mapping carries to red on non-malleable screens which is the lowest on a list of priority. 

The lack of buttons on the printing screen and refund screens are intentional. On printing screens the action that moves the system “forward” is removing the printed ticket. It wouldn’t make sense to have a confirmation button on this screen. There is no action it’s informative where the action it’s conveying is to take the printed ticket. By remaining prominent until the ticket is taken helps reduce cases where a user may tap a button and walk away forgetting their ticket. On the refund screen, there is similarly no action to be taken. Either coins are returned or the card the user paid with is refunded the difference. They take the coins (which we assume we have no sensor to detect if coins are still in a tray) or mentally acknowledge that their card has been refunded a certain balance. This screen disappears after a time duration as there is no universal action to take. The user has completed their goal of refunding unused minutes. 

## References 
Donald Norman. 2013. The Design of Everyday Things: Revised and Expanded Edition. Basic Books, New York, NY, USA. 
*Colorblindness simulated using the “Spectrum” addon in Google Chrome by Yehor Lvivski*
