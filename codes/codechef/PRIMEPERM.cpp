#include <bits/stdc++.h>
using namespace std;


int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin >> t; while(t--) {
		int n; cin >> n;
		if(n == 2 || n == 3) {
			cout << -1 << '\n';
		} else {
			if(n % 4 == 0) {
				for(int i = 1; i <= n; i += 4) {
					cout << i + 2 << ' ' << i + 3 << ' ' << i << ' ' << i + 1 << " \n"[i + 4 >= n];
				}
			} else if(n % 4 == 1) {
				cout << "3 4 5 1 2" << " \n"[n == 5];
				for(int i = 6; i <= n; i += 4) {
					cout << i + 2 << ' ' << i + 3 << ' ' << i << ' ' << i + 1 << " \n"[i + 4 >= n];
				}
			} else if(n % 4 == 2) {
				cout << "4 5 6 2 3 1" << " \n"[n == 6];
				for(int i = 7; i <= n; i += 4) {
					cout << i + 2 << ' ' << i + 3 << ' ' << i << ' ' << i + 1 << " \n"[i + 4 >= n];
				}
			} else if(n % 4 == 3) {
				cout << "4 5 6 1 7 3 2" << " \n"[n == 7];
				for(int i = 8; i <= n; i += 4) {
					cout << i + 2 << ' ' << i + 3 << ' ' << i << ' ' << i + 1 << " \n"[i + 4 >= n];
				}
			}
		}
	}
	return 0;
}