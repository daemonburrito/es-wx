# Selected notes from ICDs and other reference materials

## 2620001X Figure 3-6 Sheet 5 Note 1, re HWORD 31 in Product Description

For products 32, 94, 153, 193, and 195, data level codes 0 and 1 correspond to "Below Threshold" and "Missing", respectively. Data level codes 2 through 255 denote data values starting from the minimum data value in even data increments except data level 2 for product 193 corresponds to "edit/remove". The threshold level fields are used to describe the 256 levels as follows:

halfword 31 contains the minimum data value in dBZ _ 10
halfword 32 contains the increment in dBZ _ 10.
halfword 33 contains the number of levels (0-255)

## Note regarding radial count for high-res arrays

The RPG clips radials to 70 kft. This could result in an odd number of bins in a radial. However, the radial will always be on a halfword boundary, so the number of bytes in a radial may be number of bins in a radial + 1.
